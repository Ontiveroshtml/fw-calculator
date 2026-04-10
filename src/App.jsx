import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CalculadoraBestias } from "./pages/libros/CalculadoraBestias";
import { NavBar } from "./components/navbar/NavBar";

function App() {
  return (
    <main className="flex flex-col gap-8 text-white p-6">
      <BrowserRouter>
        <h1 className="text-3xl font-bold text-cyan-100 text-center">
          Calculadora FW (BETA)
        </h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/libros" replace />} />

          <Route path="/libros" element={<CalculadoraBestias />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
