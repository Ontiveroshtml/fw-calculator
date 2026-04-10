import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CalculadoraBestias } from "./pages/libros/CalculadoraBestias";
import { CalculadoraInsignia } from "./pages/insignias/CalculadoraInsignias";
import { CalculadoraHerramientas } from "./pages/herramientas/CalculadoraHerramientas";
import { NavBar } from "./components/navbar/NavBar";

function AppHeader() {
  const location = useLocation();
  const subtitles = {
    "/libros": "Cuartel de bestias: libros hasta nivel 30 y coste en gemas.",
    "/insignias": "Insignias: materiales acumulados y gemas por nivel.",
    "/herramientas": "Herramientas de equipo: mismos cálculos que insignias.",
  };
  const subtitle =
    subtitles[location.pathname] ?? "Herramientas para Fate War (beta).";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-400/90">
            Calculadora
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            FW{" "}
            <span className="font-semibold text-zinc-500">—</span>{" "}
            <span className="text-orange-400">recursos</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-400">
            {subtitle}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-500 md:inline-block">
          BETA
        </span>
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
