import { useState } from "react";

export const Individual = ({ insignias }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const cantidadValida = Math.max(0, cantidad);
  const costoGema = 10;

  //Calcular cuantos libros se requieren para X level
  const nivelData = insignias.find((l) => l.level === levelActual);
  const insigniasRequeridas = nivelData?.value ?? 0;

  //Calcular cuantos libros se requiere dependiendo de que cantidad tiene almacenada
  const faltante = insigniasRequeridas - cantidadValida;

  //Calcular el costo de gemas
  const calcularCostoGemas = faltante * costoGema;

  return (
    <div className="flex flex-col mx-auto gap-2 p-6 md:w-2xl bg-cyan-700 rounded-md shadow-lg">
      <h2 className="text-center mb-4 text-xl font-bold text-cyan-200">
        CALCULADORA DE INSIGNIAS (Por nivel)
      </h2>

      <p className="mb-1 text-lg font-medium">Nivel a llegar:</p>
      <input
        type="number"
        onChange={(e) => setLevelActual(Number(e.target.value))}
        placeholder="Nivel del 1 al 30"
        className={
          levelActual > 30 || levelActual < 0
            ? `bg-cyan-950/40 text-white font-medium p-4 rounded-xl border-2 border-red-700 focus:border-red-700 focus:outline focus:outline-red-700 `
            : levelActual
              ? `bg-cyan-950/40 text-white font-medium p-4 rounded-xl border-2 border-cyan-700 focus:border-cyan-500 focus:outline focus:outline-cyan-500`
              : `bg-cyan-950/40 text-white font-medium p-4 rounded-xl border-2 border-cyan-700 focus:border-cyan-500 focus:outline focus:outline-cyan-500`
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
          cantidadValida
            ? `bg-cyan-950/40 text-white font-medium p-4 rounded-xl border-2 border-cyan-700 focus:border-cyan-500 focus:outline focus:outline-cyan-500`
            : `bg-cyan-950/40 text-white font-medium p-4 rounded-xl border-2 border-cyan-700 focus:border-cyan-500 focus:outline focus:outline-cyan-500`
        }
      />

      <div className="bg-cyan-900 p-4 rounded-lg mt-2">
        <p className="text-lg font-medium">
          Libros requeridos (lvl {levelActual}):
          <span className="text-yellow-400 font-bold ml-2">
            {insigniasRequeridas < 0 ? 0 : insigniasRequeridas.toLocaleString()}
          </span>
        </p>
        <p className="text-lg font-medium">
          Libros faltantes para subir nivel:
          <span className="text-yellow-400 font-bold ml-2">
            {faltante < 0 ? 0 : faltante.toLocaleString()}
          </span>
        </p>
        <p className="text-lg font-medium">
          Costo total en gemas:
          <span className="text-yellow-400 font-bold ml-2">
            {calcularCostoGemas < 0 ? 0 : calcularCostoGemas.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
