import { useState } from "react";

export const General = ({ herramientas }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const costoGema = 10;

  const cantidadValida = Math.max(0, cantidad);

  //Calcular apartir de X nivel a lvl 30
  const calcularTotal = herramientas.reduce((acc, l) => {
    if (l.level > levelActual) return acc + l.value;
    return acc;
  }, 0);

  // Calculo para saber cuantos libros faltan a partir de X level menos N cantidad de libros almacenados
  const calcularRestante = calcularTotal - cantidadValida;

  //Calculo de costo en gemas
  const calcularGemas = calcularRestante * costoGema;

  //Mostrar cuantos libros requiere el siguiente nivel a partir del actual
  const nivelData = herramientas.find((l) => l.level === levelActual + 1);
  const herramientasRequeridas = nivelData?.value ?? 0;

  return (
    <div className="flex flex-col mx-auto gap-2 p-6 md:w-2xl bg-purple-800 rounded-md shadow-lg">
      <h2 className="text-center mb-4 text-xl font-bold text-purple-200">
        CALCULADORA DE HERRAMIENTAS (General)
      </h2>

      <p className="mb-1 text-lg font-medium">Nivel actual del cuartel:</p>
      <input
        type="number"
        onChange={(e) => setLevelActual(Number(e.target.value))}
        placeholder="Nivel del 1 al 30"
        className={
          levelActual > 30 || levelActual < 0
            ? `bg-purple-950/50 text-white font-medium p-4 rounded-xl border-2 border-red-700 focus:border-red-700 focus:outline focus:outline-red-700`
            : `bg-purple-950/50 text-white font-medium  p-4 rounded-xl border-2 border-purple-800 focus:border-purple-400 focus:outline focus:outline-purple-400`
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
        className={`bg-purple-950/50 text-white font-medium p-4 rounded-xl border-2 border-purple-800 focus:border-purple-400 focus:outline focus:outline-purple-400 `}
      />

      <div className="bg-purple-900 p-4 rounded-lg mt-2 ">
        <p className="text-lg font-medium">
          Libros requeridos lvl 30:
          <span className="text-yellow-400 font-bold ml-2">
            {calcularRestante < 0 ? 0 : calcularRestante.toLocaleString()}
          </span>
        </p>
        <p className="text-lg font-medium">
          Costo para el siguiente nivel:
          <span className="text-yellow-400 font-bold ml-2 ">
            {herramientasRequeridas < 0 ? 0 : herramientasRequeridas.toLocaleString()}
          </span>
        </p>

        <p className="text-lg font-medium">
          Costo total en gemas:
          <span className="text-yellow-400 font-bold ml-2 ">
            {calcularGemas < 0 ? 0 : calcularGemas.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
