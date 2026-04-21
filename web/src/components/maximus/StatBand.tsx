type Stat = { value: string; label: string };

export default function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-surface rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-4xl md:text-5xl font-bold tracking-tight">
            {s.value}
          </div>
          <div className="text-sm mx-ink-soft mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
