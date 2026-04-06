import { useState } from "react";

export const Individual = ({ levels }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);

  const siguienteLevel = () => {
    const resultado = levels.find((l) => l.level === levelActual);

    if (levelActual <= 30 && levelActual > 0) {
      return resultado.value;
    } else {
      return 0;
    }
  };

  const siguiente = siguienteLevel();

  const faltante = () => {
    const resultado = siguiente - cantidad;
    if (resultado > 0) {
      return resultado;
    } else {
      return 0;
    }
  };

  const resta = faltante();

  return (
    <div className="flex flex-col mx-auto gap-2 p-6 md:w-2xl bg-green-950 rounded-md shadow-lg">
      <h2 className="text-center mb-4 text-xl font-bold text-green-200">
        CALCULADORA CUARTEL DE BESTIAS (Por nivel)
      </h2>

      <p className="mb-1 text-lg font-medium">Nivel a llegar:</p>
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

      <div className="bg-green-900 p-4 rounded-lg mt-2">
        <p className="text-lg">
          Libros requeridos lvl ({levelActual}):
          <span className="text-yellow-400 font-bold ml-2">{siguiente < 0 ? 0 : siguiente}</span>
        </p>
        <p className="text-lg">
          Libros faltantes para subir nivel:
          <span className="text-yellow-400 font-bold ml-2">
            {resta < 0 ? 0 : resta}
          </span>
        </p>
      </div>
    </div>
  );
};
