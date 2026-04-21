import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type IntakePayload = {
  name: string;
  email: string;
  phone?: string;
  address: string;
  structure: string;
  age: string;
  residence: string;
  occupancy: string;
  utility: string;
  bills: string;
  earnings?: string;
  comfortNotes?: string;
};

const REQUIRED: (keyof IntakePayload)[] = [
  "name",
  "email",
  "address",
  "structure",
  "age",
  "residence",
  "occupancy",
  "utility",
  "bills",
];

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escape(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: IntakePayload;
  try {
    body = (await req.json()) as IntakePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  for (const k of REQUIRED) {
    if (!body[k] || typeof body[k] !== "string" || !String(body[k]).trim()) {
      return NextResponse.json(
        { error: `Missing required field: ${k}` },
        { status: 400 },
      );
    }
  }
  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MAXIMUS_TO_EMAIL;
  const from = process.env.MAXIMUS_FROM_EMAIL ?? "Maximus Intake <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "[maximus/intake] RESEND_API_KEY or MAXIMUS_TO_EMAIL not set; logging intake instead.",
    );
    console.log("[maximus/intake]", JSON.stringify(body));
    return NextResponse.json({ ok: true, delivered: false });
  }

  const rows: [string, string][] = [
    ["Name", body.name],
    ["Email", body.email],
    ["Phone", body.phone ?? "—"],
    ["Address", body.address],
    ["Structure", body.structure],
    ["Home age", body.age],
    ["Time of residence", body.residence],
    ["Occupancy", body.occupancy],
    ["Utility", body.utility],
    ["Monthly bills", body.bills],
    ["Budget range", body.earnings ?? "—"],
    ["Comfort notes", body.comfortNotes ?? "—"],
  ];

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px;">
      <h2 style="color:#065f46; margin-bottom:4px;">New Maximus intake</h2>
      <p style="color:#57534e; margin-top:0;">From the website /maximus/start</p>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px; background:#f5f5f4; width:180px; vertical-align:top;"><strong>${escape(k)}</strong></td>
            <td style="padding:8px 12px; border-bottom:1px solid #e7e5e4;">${escape(v).replace(/\n/g, "<br>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `Maximus intake — ${body.name}`,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[maximus/intake] send failed", e);
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 502 },
    );
  }
}
