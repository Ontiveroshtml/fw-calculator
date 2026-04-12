import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isHeroePath, pathFor } from "../../routes";

export const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage || i18n.language;

  const resourceItems = [
    { routeId: "libros", labelKey: "nav.libros" },
    { routeId: "insignias", labelKey: "nav.insignias" },
    { routeId: "herramientas", labelKey: "nav.herramientas" },
  ];

  const mementoItems = [{ routeId: "mementos", labelKey: "nav.mementos" }];

  const navItems = (isHeroePath(location.pathname) ? mementoItems : resourceItems).map(
    (item) => ({
      path: pathFor(item.routeId, lng),
      labelKey: item.labelKey,
    }),
  );

  const linkClass = (active) =>
    active
      ? "border-violet-500 text-violet-300"
      : "border-transparent text-zinc-400 hover:border-zinc-600 hover:text-zinc-200";

  return (
    <nav className="relative py-1">
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600"
          aria-expanded={isOpen}
        >
          <span>{t("nav.menu")}</span>
          <svg
            className="h-5 w-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="hidden md:flex md:flex-wrap md:gap-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${linkClass(active)}`}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-xl border border-zinc-700/80 bg-zinc-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-md md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-violet-950/60 text-violet-200"
                    : "text-zinc-300 hover:bg-zinc-800/80"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
