import { useState } from "react";
import { useTranslation } from "react-i18next";
import { resolveUiLocale } from "../../../utils/localeUi";

export const Individual = ({ insignias }) => {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const cantidadValida = Math.max(0, cantidad);
  const costoGema = 10;

  const nivelData = insignias.find((l) => l.level === levelActual);
  const insigniasRequeridas = nivelData?.value ?? 0;

  const faltante = insigniasRequeridas - cantidadValida;

  const calcularCostoGemas = faltante * costoGema;

  const invalidLevel = levelActual > 30 || levelActual < 0;
  const levelLabel =
    levelActual > 0 ? String(levelActual) : t("common.missingLevel");

  return (
    <div className="calc-card calc-card--individual">
      <h2 className="calc-card-title calc-card-title--individual">
        {t("insignias.individual.title")}
      </h2>

      <div>
        <p className="calc-label mb-1.5">
          {t("insignias.individual.targetLevel")}
        </p>
        <input
          type="number"
          onChange={(e) => setLevelActual(Number(e.target.value))}
          placeholder={t("common.levelPlaceholder")}
          className={`calc-input ${invalidLevel ? "calc-input--error" : ""}`}
        />
      </div>
      {invalidLevel && (
        <div className="calc-alert">{t("common.levelInvalid")}</div>
      )}

      <div>
        <p className="calc-label mb-1.5">{t("insignias.individual.stored")}</p>
        <input
          type="number"
          placeholder={t("common.examplePlaceholder")}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="calc-input"
        />
      </div>

      <div className="calc-results">
        <p className="calc-stat-row">
          <span>
            {t("insignias.individual.forLevel", { level: levelLabel })}
          </span>
          <span className="calc-stat-value">
            {(insigniasRequeridas < 0 ? 0 : insigniasRequeridas).toLocaleString(
              locale,
            )}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("insignias.individual.shortage")}</span>
          <span className="calc-stat-value">
            {(faltante < 0 ? 0 : faltante).toLocaleString(locale)}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("insignias.individual.gemCost")}</span>
          <span className="calc-stat-value">
            {(calcularCostoGemas < 0 ? 0 : calcularCostoGemas).toLocaleString(
              locale,
            )}
          </span>
        </p>
      </div>
    </div>
  );
};
