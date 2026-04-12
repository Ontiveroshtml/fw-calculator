import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isHeroePath, isRecursosPath, pathFor } from "../../routes";

export function AppMainNav() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage || i18n.language;

  const resourceActive = isRecursosPath(location.pathname);
  const mementosActive = isHeroePath(location.pathname);

  const segmentBase =
    "rounded-md px-3 py-1.5 text-xs font-medium transition-[color,background-color,box-shadow] sm:px-3.5 sm:py-2 sm:text-sm";

  const resourceClass = resourceActive
    ? "bg-violet-600/35 text-violet-100 shadow-sm ring-1 ring-violet-500/30"
    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200";

  const mementosClass = mementosActive
    ? "bg-teal-600/30 text-teal-100 shadow-sm ring-1 ring-teal-500/30"
    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-200";

  return (
    <div className="border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
          {t("mainNav.kicker")}
        </span>
        <nav
          className="inline-flex gap-1.5 rounded-lg border border-zinc-700/70 bg-zinc-900/70 p-1 shadow-inner shadow-black/20 sm:gap-2"
          aria-label={t("mainNav.kicker")}
        >
          <Link to={pathFor("libros", lng)} className={`${segmentBase} ${resourceClass}`}>
            {t("mainNav.resources")}
          </Link>
          <Link to={pathFor("mementos", lng)} className={`${segmentBase} ${mementosClass}`}>
            {t("mainNav.mementos")}
          </Link>
        </nav>
      </div>
    </div>
  );
}
