import type { LucideIcon } from "lucide-react";

export default function MoatCard({
  icon: Icon,
  kicker,
  title,
  children,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-surface rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="mx-chip rounded-full px-3 py-1 text-xs font-medium">
          {kicker}
        </span>
      </div>
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "var(--mx-primary-soft)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--mx-primary)" }} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="text-sm mx-ink-soft leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
