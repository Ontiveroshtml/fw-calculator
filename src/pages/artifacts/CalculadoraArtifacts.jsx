import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalculatorHelpNote } from "../../components/CalculatorHelpNote";
import { resolveUiLocale } from "../../utils/localeUi";
import {
  ARTIFACT_COLORS,
  ARTIFACT_STEEL_COSTS,
  ARTIFACT_STEEL_TOTAL,
  getArtifactSummary,
} from "./artifactCalculator";

const COLOR_CLASSES = {
  White: "text-zinc-100",
  Green: "text-emerald-300",
  Blue: "text-sky-300",
  Purple: "text-violet-300",
  Gold: "text-amber-300",
  Red: "text-rose-300",
};

export function CalculadoraArtifacts() {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);
  const [color, setColor] = useState("White");
  const [star, setStar] = useState(0);
  const [steelOwned, setSteelOwned] = useState("");
  const starOptions = useMemo(
    () =>
      ARTIFACT_STEEL_COSTS.filter((item) => item.color === color).map((item) => item.star),
    [color],
  );

  const currentTierIndex = useMemo(
    () =>
      ARTIFACT_STEEL_COSTS.findIndex((item) => item.color === color && item.star === Number(star)),
    [color, star],
  );

  const summary = useMemo(
    () => getArtifactSummary(currentTierIndex, Number(steelOwned) || 0),
    [currentTierIndex, steelOwned],
  );
  const reachedColor = summary.reachedTier.split(" ")[0];
  const reachedColorClass = COLOR_CLASSES[reachedColor] ?? COLOR_CLASSES.White;

  const localizeColor = (c) => t(`artifacts.colors.${c}`);
  const localizeTier = (tier) => {
    if (tier === "MAX") return t("artifacts.misc.max");
    if (tier === "Base") return t("artifacts.misc.base");
    const [tierColor, tierStars] = tier.split(" ");
    if (!tierColor) return tier;
    const label = localizeColor(tierColor);
    return tierStars ? `${label} ${tierStars}` : label;
  };

  return (
    <div className="page-surface flex flex-col gap-8">
      <CalculatorHelpNote variant="artifacts" />

      <div className="stat-pill w-full text-center md:text-left">
        <p className="stat-pill-label">{t("pages.artifacts.totalLabelSingle")}</p>
        <p className="stat-pill-value">{ARTIFACT_STEEL_TOTAL.toLocaleString(locale)}</p>
        <p className="stat-pill-unit">{t("pages.artifacts.totalUnit")}</p>
      </div>

      <div className="calc-card calc-card--general">
        <h2 className="calc-card-title calc-card-title--general">
          {t("artifacts.calculator.title")} {t("artifacts.calculator.steelOnly")}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="calc-label mb-1.5">{t("artifacts.calculator.currentColor")}</p>
            <select
              className="calc-input"
              value={color}
              onChange={(e) => {
                const newColor = e.target.value;
                setColor(newColor);
                const firstStar = ARTIFACT_STEEL_COSTS.find((item) => item.color === newColor)?.star ?? 0;
                setStar(firstStar);
              }}
            >
              {ARTIFACT_COLORS.map((c) => (
                <option key={c} value={c}>
                  {localizeColor(c)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="calc-label mb-1.5">{t("artifacts.calculator.currentStar")}</p>
            <select
              className="calc-input"
              value={star}
              onChange={(e) => setStar(Number(e.target.value))}
            >
              {starOptions.map((s) => (
                <option key={s} value={s}>
                  {s === 0 ? t("artifacts.calculator.noStar") : `${s}*`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="calc-label mb-1.5">{t("artifacts.calculator.steelOwned")}</p>
            <input
              type="number"
              min={0}
              value={steelOwned}
              onChange={(e) => setSteelOwned(e.target.value)}
              placeholder={t("common.examplePlaceholder")}
              className="calc-input"
            />
          </div>
        </div>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {t("artifacts.calculator.reachedTier")}
            </p>
            <p className="mt-1">
              <span className={`text-lg font-semibold ${reachedColorClass}`}>
                {localizeTier(summary.reachedTier)}
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              {t("artifacts.calculator.missingToRed")}
            </p>
            <p className="mt-1 text-lg font-semibold text-orange-300">
              {summary.missingToRed.toLocaleString(locale)}
            </p>
          </div>
        </div>

        <div className="calc-results mt-4">
          {summary.nextTier !== "MAX" && (
            <p className="calc-stat-row">
              <span>{t("artifacts.calculator.missingToNext")}</span>
              <span className="calc-stat-value">{summary.missingToNextTier.toLocaleString(locale)}</span>
            </p>
          )}
          {summary.overflowAfterRed > 0 && summary.overflowBreakdown && (
            <>
              <p className="calc-stat-row">
                <span>{t("artifacts.calculator.extraSteelAfterRed")}</span>
                <span className="calc-stat-value">
                  {summary.overflowAfterRed.toLocaleString(locale)}
                </span>
              </p>
              <p className="calc-stat-row">
                <span>{t("artifacts.calculator.fullExtraArtifacts")}</span>
                <span className="calc-stat-value">
                  {summary.overflowBreakdown.fullArtifacts.toLocaleString(locale)}
                </span>
              </p>
              {summary.overflowBreakdown.partialReachedTier && (
                <p className="calc-stat-row">
                  <span>{t("artifacts.calculator.partialExtraArtifact")}</span>
                  <span className="calc-stat-value">
                    {localizeTier(summary.overflowBreakdown.partialReachedTier)}
                  </span>
                </p>
              )}

              <details className="group mt-2 overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/40">
                <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900/70">
                  <svg
                    className="h-4 w-4 shrink-0 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8h.01M11 12h1v4h1m-1 5a9 9 0 100-18 9 9 0 000 18z"
                    />
                  </svg>
                  <span>{t("artifacts.calculator.overflowDetailsToggle")}</span>
                </summary>
                <div className="border-t border-zinc-800/80 px-3 py-2">
                  <ul className="space-y-1 text-sm text-zinc-300">
                    {summary.overflowBreakdown.steps.map((step, idx) => (
                      <li key={`${step.type}-${idx}`}>
                        {step.type === "full"
                          ? t("artifacts.calculator.overflowStepFull", { n: idx + 1 })
                          : t("artifacts.calculator.overflowStepPartial", {
                              n: idx + 1,
                              tier: localizeTier(step.reachedTier),
                            })}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </>
          )}
        </div>
      </div>

      <details className="group overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/35">
        <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900/70">
          <span>{t("artifacts.table.toggle")}</span>
          <svg
            className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="border-t border-zinc-800/80">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/80 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-4 py-3">{t("artifacts.table.tier")}</th>
                <th className="px-4 py-3 text-right">{t("artifacts.table.steel")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70 text-sm text-zinc-200">
              {ARTIFACT_STEEL_COSTS.map((item) => (
                <tr key={item.tier}>
                  <td className="px-4 py-3">{localizeTier(item.tier)}</td>
                  <td className="px-4 py-3 text-right">{item.steel.toLocaleString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
