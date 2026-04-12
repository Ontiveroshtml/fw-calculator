import { useTranslation } from "react-i18next";
import { resolveUiLocale } from "../utils/localeUi";

export function Summary({
  grandTotal,
  remainingTotal,
  heroUnlocked,
  onHeroUnlockedChange,
}) {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);

  return (
    <section className="rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-950/40 via-zinc-900/60 to-zinc-950/80 p-5 shadow-xl shadow-black/30 ring-1 ring-teal-500/10 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-400/90">
            {t("mementos.summary.kicker")}
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-50 md:text-2xl">
            {t("mementos.summary.title")}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
            {t("mementos.summary.hint")}
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-700/80 bg-zinc-950/50 px-4 py-3 transition-colors hover:border-teal-600/50">
          <input
            type="checkbox"
            checked={heroUnlocked}
            onChange={(e) => onHeroUnlockedChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-teal-500 focus:ring-teal-500/30"
          />
          <span className="text-sm font-medium text-zinc-200">
            {t("mementos.summary.heroUnlocked")}
          </span>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-700/70 bg-zinc-950/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {t("mementos.summary.total")}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-teal-300">
            {grandTotal.toLocaleString(locale)}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-700/70 bg-zinc-950/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {t("mementos.summary.remaining")}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-amber-400">
            {remainingTotal.toLocaleString(locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
