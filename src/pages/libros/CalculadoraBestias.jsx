import { useTranslation } from "react-i18next";
import { CalculatorHelpNote } from "../../components/CalculatorHelpNote";
import { General } from "./general/General";
import { Individual } from "./individual/Individual";
import libro from "../../assets/libro.webp";
import { resolveUiLocale } from "../../utils/localeUi";

export const CalculadoraBestias = () => {
  const { t, i18n } = useTranslation();
  const locale = resolveUiLocale(i18n.language);

  const levels = [
    { level: 1, value: 0 },
    { level: 2, value: 200 },
    { level: 3, value: 300 },
    { level: 4, value: 400 },
    { level: 5, value: 500 },
    { level: 6, value: 600 },
    { level: 7, value: 700 },
    { level: 8, value: 800 },
    { level: 9, value: 900 },
    { level: 10, value: 1000 },
    { level: 11, value: 1100 },
    { level: 12, value: 1200 },
    { level: 13, value: 1300 },
    { level: 14, value: 1400 },
    { level: 15, value: 1500 },
    { level: 16, value: 1600 },
    { level: 17, value: 1700 },
    { level: 18, value: 1800 },
    { level: 19, value: 1900 },
    { level: 20, value: 2000 },
    { level: 21, value: 2100 },
    { level: 22, value: 2200 },
    { level: 23, value: 2300 },
    { level: 24, value: 2400 },
    { level: 25, value: 2500 },
    { level: 26, value: 2600 },
    { level: 27, value: 2700 },
    { level: 28, value: 2800 },
    { level: 29, value: 2900 },
    { level: 30, value: 3000 },
  ];

  const total = levels.reduce((acc, lvl) => acc + lvl.value, 0);

  return (
    <div className="page-surface flex flex-col gap-10">
      <CalculatorHelpNote variant="libros" />

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
        <img
          src={libro}
          alt=""
          className="h-auto w-28 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:w-36"
        />
        <div className="stat-pill w-full max-w-sm text-center md:text-left">
          <p className="stat-pill-label">{t("pages.libros.totalLabel")}</p>
          <p className="stat-pill-value">{total.toLocaleString(locale)}</p>
          <p className="stat-pill-unit">{t("pages.libros.totalUnit")}</p>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-center gap-8 xl:flex-row xl:items-start">
        <General levels={levels} />
        <Individual levels={levels} />
      </div>
    </div>
  );
};
