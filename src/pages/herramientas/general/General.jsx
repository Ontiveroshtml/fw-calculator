import { useState } from "react";

export const General = ({ herramientas }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const costoGema = 10;

  const cantidadValida = Math.max(0, cantidad);

  const calcularTotal = herramientas.reduce((acc, l) => {
    if (l.level > levelActual) return acc + l.value;
    return acc;
  }, 0);

  const calcularRestante = calcularTotal - cantidadValida;

  const calcularGemas = calcularRestante * costoGema;

  const nivelData = herramientas.find((l) => l.level === levelActual + 1);
  const herramientasRequeridas = nivelData?.value ?? 0;

  const invalidLevel = levelActual > 30 || levelActual < 0;

  return (
    <div className="calc-card calc-card--general">
      <h2 className="calc-card-title calc-card-title--general">
        Herramientas — vista general
      </h2>

      <div>
        <p className="calc-label mb-1.5">Nivel actual</p>
        <input
          type="number"
          onChange={(e) => setLevelActual(Number(e.target.value))}
          placeholder="1 – 30"
          className={`calc-input ${invalidLevel ? "calc-input--error" : ""}`}
        />
      </div>
      {invalidLevel && (
        <div className="calc-alert">
          El rango permitido es del 1 al 30.
        </div>
      )}

      <div>
        <p className="calc-label mb-1.5">Herramientas almacenadas</p>
        <input
          type="number"
          placeholder="Ej. 1500"
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="calc-input"
        />
      </div>

      <div className="calc-results">
        <p className="calc-stat-row">
          <span>Hasta nivel 30</span>
          <span className="calc-stat-value">
            {(calcularRestante < 0 ? 0 : calcularRestante).toLocaleString()}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>Siguiente nivel</span>
          <span className="calc-stat-value">
            {(herramientasRequeridas < 0 ? 0 : herramientasRequeridas).toLocaleString()}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>Coste en gemas (10 / unidad)</span>
          <span className="calc-stat-value">
            {(calcularGemas < 0 ? 0 : calcularGemas).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
