"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

type Intake = {
  name: string;
  email: string;
  phone: string;
  address: string;
  structure: string;
  age: string;
  residence: string;
  occupancy: string;
  utility: string;
  bills: string;
  earnings: string;
  comfortNotes: string;
};

const empty: Intake = {
  name: "",
  email: "",
  phone: "",
  address: "",
  structure: "",
  age: "",
  residence: "",
  occupancy: "",
  utility: "",
  bills: "",
  earnings: "",
  comfortNotes: "",
};

const steps: {
  title: string;
  blurb: string;
  fields: {
    key: keyof Intake;
    label: string;
    type?: "text" | "email" | "tel" | "textarea" | "select";
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }[];
}[] = [
  {
    title: "Let's meet",
    blurb: "How we'll reach you with your savings estimate.",
    fields: [
      { key: "name", label: "Your name", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "tel" },
      {
        key: "address",
        label: "Home address",
        placeholder: "Street, city, ZIP",
        required: true,
      },
    ],
  },
  {
    title: "Your home",
    blurb: "The bones — we'll benchmark the rest on site.",
    fields: [
      {
        key: "structure",
        label: "Structure type",
        type: "select",
        options: [
          "Single-family detached",
          "Townhouse",
          "Condo / apartment",
          "Multi-family",
          "Other",
        ],
        required: true,
      },
      {
        key: "age",
        label: "Approximate age of home",
        type: "select",
        options: [
          "Less than 10 years",
          "10–25 years",
          "25–50 years",
          "50+ years",
          "Not sure",
        ],
        required: true,
      },
    ],
  },
  {
    title: "Who lives there",
    blurb: "Comfort is personal — we design around the people in the home.",
    fields: [
      {
        key: "residence",
        label: "How long have you lived there?",
        type: "select",
        options: [
          "Less than 1 year",
          "1–3 years",
          "3–10 years",
          "10+ years",
        ],
        required: true,
      },
      {
        key: "occupancy",
        label: "How many people occupy the home?",
        type: "select",
        options: ["1", "2", "3–4", "5+"],
        required: true,
      },
    ],
  },
  {
    title: "Energy use",
    blurb: "A rough snapshot is fine — we'll verify on the walkthrough.",
    fields: [
      {
        key: "utility",
        label: "Primary utility provider(s)",
        placeholder: "e.g., PG&E, ConEd, local co-op",
        required: true,
      },
      {
        key: "bills",
        label: "Typical monthly utility spend",
        type: "select",
        options: [
          "Under $100",
          "$100–$250",
          "$250–$500",
          "$500–$1,000",
          "$1,000+",
          "Not sure",
        ],
        required: true,
      },
      {
        key: "earnings",
        label: "Household budget range for improvements (optional)",
        type: "select",
        options: [
          "Prefer not to say",
          "Under $5k",
          "$5k–$20k",
          "$20k–$50k",
          "$50k+",
        ],
      },
    ],
  },
  {
    title: "How does the home feel?",
    blurb:
      "This is where we start. Cold spots, stuffy rooms, loud equipment, rooms you avoid — tell us in your own words.",
    fields: [
      {
        key: "comfortNotes",
        label: "Comfort notes",
        type: "textarea",
        placeholder:
          "e.g., 'Upstairs bedroom never gets cool in summer', 'Basement is always damp', 'The kids' room feels drafty in winter'",
      },
    ],
  },
];

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Intake>(empty);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;

  const set = <K extends keyof Intake>(k: K, v: Intake[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const canAdvance = current.fields.every((f) =>
    f.required ? data[f.key].trim().length > 0 : true,
  );

  async function submit() {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/maximus/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not submit");
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Could not submit");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-surface rounded-2xl p-10 text-center">
        <CheckCircle
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: "var(--mx-primary)" }}
        />
        <h2 className="text-2xl font-semibold mb-2">Got it. Thank you.</h2>
        <p className="mx-ink-soft max-w-md mx-auto">
          We&apos;ll review your intake and reach out within two business days
          to schedule a site visit. In the meantime, we&apos;re already
          sketching what your comfort + savings picture could look like.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-surface rounded-2xl p-8 md:p-10">
      <div className="flex items-center gap-2 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{
              background:
                i <= step ? "var(--mx-primary)" : "var(--mx-line)",
            }}
          />
        ))}
      </div>

      <div className="mb-6">
        <span className="text-xs mx-ink-soft">
          Step {step + 1} of {total}
        </span>
        <h2 className="text-2xl font-semibold mt-1">{current.title}</h2>
        <p className="mx-ink-soft mt-1">{current.blurb}</p>
      </div>

      <div className="space-y-4">
        {current.fields.map((f) => {
          const value = data[f.key];
          const id = `mx-f-${f.key}`;
          const label = (
            <label htmlFor={id} className="block text-sm font-medium mb-1">
              {f.label}
              {f.required && (
                <span style={{ color: "var(--mx-accent)" }}> *</span>
              )}
            </label>
          );
          const base =
            "w-full rounded-md px-3 py-2 bg-white border focus:outline-none";
          const style = { borderColor: "var(--mx-line)" } as const;

          if (f.type === "textarea") {
            return (
              <div key={f.key}>
                {label}
                <textarea
                  id={id}
                  rows={5}
                  placeholder={f.placeholder}
                  value={value}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={base}
                  style={style}
                />
              </div>
            );
          }
          if (f.type === "select") {
            return (
              <div key={f.key}>
                {label}
                <select
                  id={id}
                  value={value}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={base}
                  style={style}
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          return (
            <div key={f.key}>
              {label}
              <input
                id={id}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                value={value}
                onChange={(e) => set(f.key, e.target.value)}
                className={base}
                style={style}
              />
            </div>
          );
        })}
      </div>

      {error && (
        <div
          className="mt-4 text-sm rounded-md px-3 py-2"
          style={{
            background: "var(--mx-accent-soft)",
            color: "var(--mx-accent)",
          }}
        >
          {error}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 text-sm mx-ink-soft disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={!canAdvance || status === "submitting"}
            className="mx-btn-primary rounded-md px-5 py-2.5 text-sm font-medium disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send to Maximus"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            disabled={!canAdvance}
            className="mx-btn-primary rounded-md px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
