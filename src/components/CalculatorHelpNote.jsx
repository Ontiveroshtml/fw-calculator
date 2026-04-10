import { useTranslation } from "react-i18next";

export function CalculatorHelpNote({ variant }) {
  const { t } = useTranslation();
  const items = t(`help.${variant}`, { returnObjects: true });

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <details className="help-accordion group rounded-xl border border-zinc-700/60 bg-zinc-950/45 open:border-zinc-600/70 open:bg-zinc-950/55">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-zinc-900/50 [&::-moz-list-bullet]:hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400/90">
          {t("help.title")}
        </span>
        <span className="sr-only">{t("language.expandAccordion")}</span>
        <svg
          className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="border-t border-zinc-700/50 px-4 pb-4 pt-1">
        <ul className="list-disc space-y-2.5 pl-5 pt-3 text-sm leading-relaxed text-zinc-400 marker:text-zinc-600">
          {items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
