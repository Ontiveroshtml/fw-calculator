/** Localized URL paths: Spanish vs English segments. */

export const ROUTE_IDS = ["libros", "insignias", "herramientas", "mementos"];

const PATHS = {
  es: {
    libros: "/recursos/libros",
    insignias: "/recursos/insignias",
    herramientas: "/recursos/herramientas",
    mementos: "/heroe/recuerdos",
    recursosIndex: "/recursos",
    heroeIndex: "/heroe",
  },
  en: {
    libros: "/resources/books",
    insignias: "/resources/badges",
    herramientas: "/resources/toolbox",
    mementos: "/hero/mementos",
    recursosIndex: "/resources",
    heroeIndex: "/hero",
  },
};

function pathToRouteIdMap() {
  const map = new Map();
  for (const locale of ["es", "en"]) {
    const p = PATHS[locale];
    for (const id of ROUTE_IDS) {
      map.set(p[id], id);
    }
  }
  return map;
}

const PATHNAME_TO_ROUTE_ID = pathToRouteIdMap();

export function routingLang(lang) {
  return lang?.toLowerCase().startsWith("es") ? "es" : "en";
}

/** Full path for a logical route and UI language (i18n language string). */
export function pathFor(routeId, lang) {
  const lng = routingLang(lang);
  const path = PATHS[lng][routeId];
  if (!path) throw new Error(`Unknown routeId: ${routeId}`);
  return path;
}

/** Logical page from exact pathname, or null. */
export function getRouteIdFromPathname(pathname) {
  return PATHNAME_TO_ROUTE_ID.get(pathname) ?? null;
}

export function isRecursosPath(pathname) {
  return (
    pathname === "/recursos" ||
    pathname.startsWith("/recursos/") ||
    pathname === "/resources" ||
    pathname.startsWith("/resources/")
  );
}

export function isHeroePath(pathname) {
  return (
    pathname === "/heroe" ||
    pathname.startsWith("/heroe/") ||
    pathname === "/hero" ||
    pathname.startsWith("/hero/")
  );
}

export { PATHS };
