import { General } from "./general/General";
import { Individual } from "./individual/Individual";
import libro from "../../assets/libro.webp";

export const CalculadoraBestias = () => {
  //  Niveles 1 al 30
  const levels = [
    { level: 1, value: 0 },
    { level: 2, value: 200 },
    { level: 3, value: 300 },
    { level: 4, value: 400 },
    { level: 5, value: 500 },
    { level: 6, value: 600 },
    { level: 7, value: 700 },
    { level: 8, value: 800 },
    { level: 9, value: 900 },
    { level: 10, value: 1000 },
    { level: 11, value: 1100 },
    { level: 12, value: 1200 },
    { level: 13, value: 1300 },
    { level: 14, value: 1400 },
    { level: 15, value: 1500 },
    { level: 16, value: 1600 },
    { level: 17, value: 1700 },
    { level: 18, value: 1800 },
    { level: 19, value: 1900 },
    { level: 20, value: 2000 },
    { level: 21, value: 2100 },
    { level: 22, value: 2200 },
    { level: 23, value: 2300 },
    { level: 24, value: 2400 },
    { level: 25, value: 2500 },
    { level: 26, value: 2600 },
    { level: 27, value: 2700 },
    { level: 28, value: 2800 },
    { level: 29, value: 2900 },
    { level: 30, value: 3000 },
  ];

  const total = levels.reduce((acc, lvl) => acc + lvl.value, 0);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <img
          src={libro}
          alt="imagen de libro"
          className="w-30 lg:w-40 xl:w-50"
        />
        <p className="font-medium -mt-2 lg:-mt-9 text-lg">
          Total:{" "}
          <span className="text-cyan-400 font-black">
            {total.toLocaleString()}{" "}
          </span>
          libros
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 justify-center items-center">
        <General levels={levels} />
        <Individual levels={levels} />
      </div>
    </div>
  );
};
