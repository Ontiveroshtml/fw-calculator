import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/libros", label: "Calculadora libros" },
    { path: "/insignias", label: "Calculadora insignias" },
    { path: "/herramientas", label: "Calculadora herramientas" },
  ];

  return (
    <nav className="relative">
      {/* Hamburger button for mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-900 p-3 rounded-lg font-medium text-cyan-100 hover:text-cyan-400 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex gap-4 justify-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-cyan-700 text-cyan-200 "
                : "bg-cyan-900 text-cyan-100 hover:text-cyan-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyan-900/95 backdrop-blur-sm rounded-lg mt-2 p-4 shadow-lg border border-cyan-700/50">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`p-3 rounded-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-cyan-700 text-cyan-200 border-2 border-cyan-500"
                    : "bg-cyan-800 text-cyan-100 hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
