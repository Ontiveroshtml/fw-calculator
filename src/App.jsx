import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Analytics } from "@vercel/analytics/react";
import { CalculadoraBestias } from "./pages/libros/CalculadoraBestias";
import { CalculadoraInsignia } from "./pages/insignias/CalculadoraInsignias";
import { CalculadoraHerramientas } from "./pages/herramientas/CalculadoraHerramientas";
import { CalculadoraArtifacts } from "./pages/artifacts/CalculadoraArtifacts";
import { CalculadoraMementos } from "./pages/mementos/CalculadoraMementos";
import { NavBar } from "./components/navbar/NavBar";
import { AppMainNav } from "./components/navbar/AppMainNav";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { LocalizedRedirect } from "./components/LocalizedRedirect";
import { getRouteIdFromPathname, isArtifactsPath, isHeroePath, PATHS } from "./routes";

function subtitleKeyForPath(pathname) {
  const id = getRouteIdFromPathname(pathname);
  switch (id) {
    case "libros":
      return "subtitles.libros";
    case "insignias":
      return "subtitles.insignias";
    case "herramientas":
      return "subtitles.herramientas";
    case "artefactos":
      return "subtitles.artefactos";
    case "mementos":
      return "subtitles.mementos";
    default:
      return "subtitles.default";
  }
}

function AppHeader() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const onHeroe = isHeroePath(location.pathname);
  const onArtifacts = isArtifactsPath(location.pathname);

  useEffect(() => {
    const hero = isHeroePath(location.pathname);
    const titleKey = hero ? "meta.titleMementos" : "meta.title";
    document.title = t(titleKey);
  }, [t, i18n.language, location.pathname]);

  const subtitleKey = subtitleKeyForPath(location.pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400/90">
            {t("header.kicker")}
          </p>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            <span className="text-violet-400">{t("header.brandVel")}</span>
            <span className="text-white">{t("header.brandWiki")}</span>{" "}
            <span className="font-semibold text-zinc-500">—</span>{" "}
            <span
              className={
                onHeroe ? "text-teal-400" : onArtifacts ? "text-amber-400" : "text-orange-400"
              }
            >
              {onHeroe
                ? t("header.titleMementos")
                : onArtifacts
                  ? t("header.titleArtifacts")
                  : t("header.titleResources")}
            </span>
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
      <AppMainNav />
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
            <Route path="/" element={<LocalizedRedirect routeId="libros" />} />

            <Route
              path="/recursos"
              element={<Navigate to={PATHS.es.libros} replace />}
            />
            <Route path={PATHS.es.libros} element={<CalculadoraBestias />} />
            <Route path={PATHS.es.insignias} element={<CalculadoraInsignia />} />
            <Route path={PATHS.es.herramientas} element={<CalculadoraHerramientas />} />
            <Route path={PATHS.es.artefactos} element={<CalculadoraArtifacts />} />

            <Route
              path="/resources"
              element={<Navigate to={PATHS.en.libros} replace />}
            />
            <Route path={PATHS.en.libros} element={<CalculadoraBestias />} />
            <Route path={PATHS.en.insignias} element={<CalculadoraInsignia />} />
            <Route path={PATHS.en.herramientas} element={<CalculadoraHerramientas />} />
            <Route path={PATHS.en.artefactos} element={<CalculadoraArtifacts />} />

            <Route
              path="/heroe"
              element={<Navigate to={PATHS.es.mementos} replace />}
            />
            <Route
              path="/heroe/mementos"
              element={<Navigate to={PATHS.es.mementos} replace />}
            />
            <Route path={PATHS.es.mementos} element={<CalculadoraMementos />} />

            <Route path="/hero" element={<Navigate to={PATHS.en.mementos} replace />} />
            <Route path={PATHS.en.mementos} element={<CalculadoraMementos />} />

            <Route path="/libros" element={<LocalizedRedirect routeId="libros" />} />
            <Route path="/insignias" element={<LocalizedRedirect routeId="insignias" />} />
            <Route
              path="/herramientas"
              element={<LocalizedRedirect routeId="herramientas" />}
            />
            <Route
              path="/artefactos"
              element={<LocalizedRedirect routeId="artefactos" />}
            />
            <Route
              path="/artifacts"
              element={<LocalizedRedirect routeId="artefactos" />}
            />
            <Route path="/mementos" element={<LocalizedRedirect routeId="mementos" />} />
            <Route path="/fragmentos" element={<LocalizedRedirect routeId="mementos" />} />
          </Routes>
        </main>
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;
