import { useState } from "react";
import { useTranslation } from "react-i18next";
import { resolveUiLocale } from "../../../utils/localeUi";

export const General = ({ herramientas }) => {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const costoGema = 10;

  const cantidadValida = Math.max(0, cantidad);

  const calcularTotal = herramientas.reduce((acc, l) => {
    if (l.level > levelActual) return acc + l.value;
    return acc;
  }, 0);

  const calcularRestante = calcularTotal - cantidadValida;

  const calcularGemas = calcularRestante * costoGema;

  const nivelData = herramientas.find((l) => l.level === levelActual + 1);
  const herramientasRequeridas = nivelData?.value ?? 0;

  const invalidLevel = levelActual > 30 || levelActual < 0;

  return (
    <div className="calc-card calc-card--general">
      <h2 className="calc-card-title calc-card-title--general">
        {t("herramientas.general.title")}
      </h2>

      <div>
        <p className="calc-label mb-1.5">
          {t("herramientas.general.currentLevel")}
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
        <p className="calc-label mb-1.5">{t("herramientas.general.stored")}</p>
        <input
          type="number"
          placeholder={t("common.examplePlaceholder")}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="calc-input"
        />
      </div>

      <div className="calc-results">
        <p className="calc-stat-row">
          <span>{t("herramientas.general.to30")}</span>
          <span className="calc-stat-value">
            {(calcularRestante < 0 ? 0 : calcularRestante).toLocaleString(
              locale,
            )}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("herramientas.general.nextLevel")}</span>
          <span className="calc-stat-value">
            {(
              herramientasRequeridas < 0 ? 0 : herramientasRequeridas
            ).toLocaleString(locale)}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("herramientas.general.gemCost")}</span>
          <span className="calc-stat-value">
            {(calcularGemas < 0 ? 0 : calcularGemas).toLocaleString(locale)}
          </span>
        </p>
      </div>
    </div>
  );
};
