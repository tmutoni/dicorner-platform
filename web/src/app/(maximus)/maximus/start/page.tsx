import IntakeForm from "@/components/maximus/IntakeForm";

export default function StartPage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-8">
        <span className="text-xs mx-ink-soft uppercase tracking-wider">
          Start your assessment
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
          Six questions. Two business days.
        </h1>
        <p className="mt-5 text-lg mx-ink-soft">
          Tell us about your home and how it feels. We&apos;ll review,
          sketch a first picture of your comfort + savings, and reach out
          to schedule the walkthrough.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <IntakeForm />
      </section>
    </>
  );
}
