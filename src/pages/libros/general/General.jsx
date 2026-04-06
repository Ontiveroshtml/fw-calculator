import { useState } from "react";

export const General = ({ levels }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);

  // Cálculo del total de todos los niveles
  // const total = levels.reduce((acc, lvl) => acc + lvl.value, 0);

  // Lógica para calcular cuánto falta
  const calcularRestante = () => {
    const filtroLevel = levels
      .filter((l) => l.level > levelActual)
      .reduce((acc, l) => acc + l.value, 0);

    const resultado = filtroLevel - cantidad;

    return resultado;
  };

  //Logica de costo con gemas
  const calcularGemas = () => {
    const costoGema = 16;
    const filtroLevel = levels
      .filter((l) => l.level > levelActual)
      .reduce((acc, l) => acc + l.value, 0);

    const resultado = (filtroLevel - cantidad) * costoGema;

    return resultado;
  };

  //Mostrar cuantos libros requiere el siguiente nivel a partir del actual
  const siguienteLevel = () => {
    const siguiente = levelActual + 1;
    const resultado = levels.find((l) => l.level === siguiente);

    if (levelActual <= 29 && levelActual > 0) {
      return resultado.value;
    } else {
      return 0;
    }
  };

  const meFalta = calcularRestante();
  const gemas = calcularGemas();
  const siguiente = siguienteLevel();

  return (
    <div className="flex flex-col mx-auto gap-2 p-6 md:w-2xl bg-purple-950 rounded-md shadow-lg">
      <h2 className="text-center mb-4 text-xl font-bold text-purple-200">
        CALCULADORA CUARTEL DE BESTIAS (general)
      </h2>

      <p className="mb-1 text-lg font-medium">Nivel actual del cuartel:</p>
      <input
        type="number"
        onChange={(e) => setLevelActual(Number(e.target.value))}
        placeholder="Nivel del 1 al 30"
        className={
          levelActual > 30 || levelActual < 0
            ? `bg-red-50 text-black font-medium p-2 rounded border-2 focus:border-red-700 focus:outline focus:outline-red-700 `
            : levelActual
              ? `bg-white text-black p-2 rounded  border-2 focus:border-green-700 focus:outline focus:outline-green-700`
              : `bg-white text-black p-2 rounded border-2 focus:border-white focus:outline focus:outline-white `
        }
      />
      {(levelActual > 30 || levelActual < 0) && (
        <div className="bg-red-950/60 text-red-300 font-medium p-3">
          <span>¡El rango de niveles permitido es del 1 al 30!</span>
        </div>
      )}

      <p className="mb-1 text-lg font-medium">Libros almacenados:</p>
      <input
        type="number"
        placeholder="Ej: 1500"
        onChange={(e) => setCantidad(Number(e.target.value))}
        className={
          cantidad
            ? `bg-white text-black p-2 rounded  border-2 focus:border-green-700 focus:outline focus:outline-green-700`
            : `bg-white text-black p-2 rounded border-2 focus:border-white focus:outline focus:outline-white `
        }
      />

      <div className="bg-purple-900 p-4 rounded-lg mt-2">
        <p className="text-lg">
          Libros requeridos para lvl 30:
          <span className="text-yellow-400 font-bold ml-2">
            {meFalta < 0 ? 0 : meFalta.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          Libros para el siguiente nivel:
          <span className="text-yellow-400 font-bold ml-2">
            {siguiente < 0 ? 0 : siguiente.toLocaleString()}
          </span>
        </p>

        <p className="text-lg">
          Costo total en gemas:
          <span className="text-yellow-400 font-bold ml-2">
            {gemas < 0 ? 0 : gemas.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
