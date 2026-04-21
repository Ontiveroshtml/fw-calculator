import { useTranslation } from "react-i18next";
import { resolveUiLocale } from "../utils/localeUi";
import { DEFAULT_HERO_MEMENTO } from "../utils/mementoCalculator";

export function SkillCard({
  skillIndex,
  level,
  remainingForSkill,
  onLevelChange,
  config = DEFAULT_HERO_MEMENTO,
}) {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);

  const { minLevel, maxLevel } = config;
  const isComplete = level >= maxLevel;
  const inProgress = !isComplete;

  const borderClass = isComplete
    ? "border-emerald-500/35 ring-emerald-500/15"
    : "border-zinc-700/80 ring-violet-500/10";

  const headerAccent = isComplete ? "text-emerald-300" : "text-violet-300";

  return (
    <article
      className={`flex flex-col rounded-2xl border bg-zinc-900/70 p-5 shadow-lg shadow-black/25 ring-1 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 ${borderClass}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={`text-sm font-bold ${headerAccent}`}>
            {t("mementos.skill.title", { n: skillIndex + 1 })}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {t("mementos.skill.subtitle")}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            isComplete
              ? "bg-emerald-950/80 text-emerald-300"
              : "bg-violet-950/70 text-violet-200"
          }`}
        >
          {isComplete ? t("mementos.skill.done") : t("mementos.skill.progress")}
        </span>
      </div>

      <div className="mt-4">
        <label className="calc-label mb-2 block" htmlFor={`skill-${skillIndex}`}>
          {t("mementos.skill.selectLevel")}
        </label>
        <select
          id={`skill-${skillIndex}`}
          value={level}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="calc-input"
        >
          {Array.from({ length: maxLevel - minLevel + 1 }, (_, i) => minLevel + i).map(
            (lv) => (
              <option key={lv} value={lv}>
                {t("mementos.skill.optionLevel", { level: lv, max: maxLevel })}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-700/50 bg-zinc-950/55 p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-xs font-medium text-zinc-500">
            {t("mementos.skill.remainingLine")}
          </span>
          <span
            className={`text-lg font-bold tabular-nums ${
              inProgress ? "text-amber-400" : "text-emerald-400"
            }`}
          >
            {remainingForSkill.toLocaleString(locale)}
          </span>
        </div>
      </div>
    </article>
  );
}
