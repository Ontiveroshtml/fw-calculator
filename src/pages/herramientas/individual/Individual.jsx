import { useState } from "react";

export const Individual = ({ herramientas }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const cantidadValida = Math.max(0, cantidad);
  const costoGema = 10;

  const nivelData = herramientas.find((l) => l.level === levelActual);
  const herramientasRequeridas = nivelData?.value ?? 0;

  const faltante = herramientasRequeridas - cantidadValida;

  const calcularCostoGemas = faltante * costoGema;

  const invalidLevel = levelActual > 30 || levelActual < 0;

  return (
    <div className="calc-card calc-card--individual">
      <h2 className="calc-card-title calc-card-title--individual">
        Herramientas — por nivel
      </h2>

      <div>
        <p className="calc-label mb-1.5">Nivel objetivo</p>
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
          <span>Para nivel {levelActual || "—"}</span>
          <span className="calc-stat-value">
            {(herramientasRequeridas < 0 ? 0 : herramientasRequeridas).toLocaleString()}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>Faltantes</span>
          <span className="calc-stat-value">
            {(faltante < 0 ? 0 : faltante).toLocaleString()}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>Coste en gemas (10 / unidad)</span>
          <span className="calc-stat-value">
            {(calcularCostoGemas < 0 ? 0 : calcularCostoGemas).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
