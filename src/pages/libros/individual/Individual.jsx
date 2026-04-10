import { useState } from "react";

export const Individual = ({ levels }) => {
  const [levelActual, setLevelActual] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const cantidadValida = Math.max(0, cantidad);
  const costoGema = 16;

  const nivelData = levels.find((l) => l.level === levelActual);
  const librosRequeridos = nivelData?.value ?? 0;

  const faltante = librosRequeridos - cantidadValida;

  const calcularCostoGemas = faltante * costoGema;

  const invalidLevel = levelActual > 30 || levelActual < 0;

  return (
    <div className="calc-card calc-card--individual">
      <h2 className="calc-card-title calc-card-title--individual">
        Cuartel — por nivel
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
        <p className="calc-label mb-1.5">Libros almacenados</p>
        <input
          type="number"
          placeholder="Ej. 1500"
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="calc-input"
        />
      </div>

      <div className="calc-results">
        <p className="calc-stat-row">
          <span>Libros para nivel {levelActual || "—"}</span>
          <span className="calc-stat-value">
            {librosRequeridos.toLocaleString()}
          </span>
        </p>
        <p className="calc-stat-row">
          <span>Faltantes</span>
          <span className="calc-stat-value">{faltante.toLocaleString()}</span>
        </p>
        <p className="calc-stat-row">
          <span>Coste en gemas (16 / libro)</span>
          <span className="calc-stat-value">
            {calcularCostoGemas.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
