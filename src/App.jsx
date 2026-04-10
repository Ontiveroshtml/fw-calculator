import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CalculadoraBestias } from "./pages/libros/CalculadoraBestias";
import { CalculadoraInsignia } from "./pages/insignias/CalculadoraInsignias";
import { CalculadoraHerramientas } from "./pages/herramientas/CalculadoraHerramientas";
import { NavBar } from "./components/navbar/NavBar";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

function AppHeader() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("meta.title");
  }, [t, i18n.language]);

  const subtitleKey =
    location.pathname === "/libros"
      ? "subtitles.libros"
      : location.pathname === "/insignias"
        ? "subtitles.insignias"
        : location.pathname === "/herramientas"
          ? "subtitles.herramientas"
          : "subtitles.default";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400/90">
            {t("header.kicker")}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t("header.titleFw")}{" "}
            <span className="font-semibold text-zinc-500">—</span>{" "}
            <span className="text-orange-400">{t("header.titleResources")}</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-400">
            {t(subtitleKey)}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 md:flex-col md:items-end lg:flex-row lg:items-center">
          <LanguageSwitcher />
          <span className="rounded-full border border-violet-500/80 bg-violet-900/80 px-3 py-1 text-xs font-medium text-violet-300">
            {t("header.beta")}
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-zinc-800/60 px-4">
        <NavBar />
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AppHeader />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/libros" replace />} />
            <Route path="/libros" element={<CalculadoraBestias />} />
            <Route path="/insignias" element={<CalculadoraInsignia />} />
            <Route path="/herramientas" element={<CalculadoraHerramientas />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
