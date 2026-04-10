import insignia from "../../assets/herramientas.webp";
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
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <img
          src={insignia}
          alt="imagen de libro"
          className="w-30 md:w-40 xl:w-60"
        />
        <p className="font-medium -mt-2 lg:-mt-3 text-lg">
          Total:
          <span className="ml-1 mr-1 text-cyan-400 font-black">
            {total.toLocaleString()}
          </span>
          libros
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 justify-center items-center">
        <General herramientas={herramientas} />
        <Individual herramientas={herramientas} />
      </div>
    </div>
  );
};
