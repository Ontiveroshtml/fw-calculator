import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import mexicoFlag from "../assets/flag-for-flag-mexico-svgrepo-com.svg";
import usaFlag from "../assets/usa-svgrepo-com.svg";
import { getRouteIdFromPathname, pathFor } from "../routes";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const resolved = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
  const isEs = resolved.startsWith("es");

  const switchLanguage = (lng) => {
    const routeId = getRouteIdFromPathname(location.pathname);
    void i18n.changeLanguage(lng).then(() => {
      if (routeId) {
        navigate(pathFor(routeId, lng), { replace: true });
      }
    });
  };

  const btn =
    "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500";

  const flagWrap = "shrink-0 overflow-hidden rounded-sm ring-1 ring-black/25 dark:ring-white/20";

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-zinc-700/80 bg-zinc-900/80 p-0.5"
      role="group"
      aria-label={t("language.label")}
    >
      <button
        type="button"
        lang="es-MX"
        title={t("language.esMx")}
        aria-label={t("language.esMx")}
        aria-pressed={isEs}
        onClick={() => switchLanguage("es")}
        className={`${btn} ${
          isEs
            ? "bg-violet-600/90 text-white"
            : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200"
        }`}
      >
        <span className={`${flagWrap} h-4 w-6`}>
          <img
            src={mexicoFlag}
            alt=""
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </span>
        <span>ES</span>
      </button>
      <button
        type="button"
        lang="en-US"
        title={t("language.enUs")}
        aria-label={t("language.enUs")}
        aria-pressed={!isEs}
        onClick={() => switchLanguage("en")}
        className={`${btn} ${
          !isEs
            ? "bg-violet-600/90 text-white"
            : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200"
        }`}
      >
        <span className={`${flagWrap} h-4 w-6`}>
          <img
            src={usaFlag}
            alt=""
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </span>
        <span>EN</span>
      </button>
    </div>
  );
}
