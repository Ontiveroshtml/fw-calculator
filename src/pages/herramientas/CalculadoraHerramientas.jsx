import { CalculatorHelpNote } from "../../components/CalculatorHelpNote";
import herramientasImg from "../../assets/herramientas.webp";
import { Individual } from "./individual/Individual";
import { General } from "./general/General";

export const CalculadoraHerramientas = () => {
  const herramientas = [
    { level: 1, value: 0 },
    { level: 2, value: 5 },
    { level: 3, value: 5 },
    { level: 4, value: 10 },
    { level: 5, value: 20 },
    { level: 6, value: 30 },
    { level: 7, value: 40 },
    { level: 8, value: 50 },
    { level: 9, value: 75 },
    { level: 10, value: 100 },
    { level: 11, value: 125 },
    { level: 12, value: 150 },
    { level: 13, value: 200 },
    { level: 14, value: 300 },
    { level: 15, value: 400 },
    { level: 16, value: 500 },
    { level: 17, value: 750 },
    { level: 18, value: 1000 },
    { level: 19, value: 1500 },
    { level: 20, value: 2000 },
    { level: 21, value: 2500 },
    { level: 22, value: 3000 },
    { level: 23, value: 3500 },
    { level: 24, value: 4000 },
    { level: 25, value: 5000 },
    { level: 26, value: 6000 },
    { level: 27, value: 7000 },
    { level: 28, value: 8000 },
    { level: 29, value: 9000 },
    { level: 30, value: 10000 },
  ];
  const total = herramientas.reduce((acc, lvl) => acc + lvl.value, 0);

  return (
    <div className="page-surface flex flex-col gap-10">
      <CalculatorHelpNote variant="herramientas" />

      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
        <img
          src={herramientasImg}
          alt=""
          className="h-auto w-28 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:w-44"
        />
        <div className="stat-pill w-full max-w-sm text-center md:text-left">
          <p className="stat-pill-label">Total acumulado (nivel 1 → 30)</p>
          <p className="stat-pill-value">{total.toLocaleString()}</p>
          <p className="stat-pill-unit">herramientas</p>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-center gap-8 xl:flex-row xl:items-start">
        <General herramientas={herramientas} />
        <Individual herramientas={herramientas} />
      </div>
    </div>
  );
};
