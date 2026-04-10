import { useState } from "react";
import { useTranslation } from "react-i18next";
import { resolveUiLocale } from "../../../utils/localeUi";

export const General = ({ levels }) => {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const costoGema = 16;

  const cantidadValida = Math.max(0, cantidad);

  const calcularTotal = levels.reduce((acc, l) => {
    if (l.level > levelActual) return acc + l.value;
    return acc;
  }, 0);

  const calcularRestante = calcularTotal - cantidadValida;

  const calcularGemas = calcularRestante * costoGema;

  const nivelData = levels.find((l) => l.level === levelActual + 1);
  const LibrosRequeridos = nivelData?.value ?? 0;

  const invalidLevel = levelActual > 30 || levelActual < 0;

  return (
    <div className="calc-card calc-card--general">
      <h2 className="calc-card-title calc-card-title--general">
        {t("libros.general.title")}
      </h2>

      <div>
        <p className="calc-label mb-1.5">{t("libros.general.currentLevel")}</p>
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
        <p className="calc-label mb-1.5">{t("libros.general.stored")}</p>
        <input
          type="number"
          placeholder={t("common.examplePlaceholder")}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="calc-input"
        />
      </div>

      <div className="calc-results">
        <p className="calc-stat-row">
          <span>{t("libros.general.to30")}</span>
          <span className="calc-stat-value">
            {calcularRestante.toLocaleString(locale)}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("libros.general.nextLevel")}</span>
          <span className="calc-stat-value">
            {LibrosRequeridos.toLocaleString(locale)}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>{t("libros.general.gemCost")}</span>
          <span className="calc-stat-value">
            {calcularGemas.toLocaleString(locale)}
          </span>
        </p>
      </div>
    </div>
  );
};
