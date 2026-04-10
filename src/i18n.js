import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";

function setDocumentLang(lng) {
  if (lng?.toLowerCase().startsWith("es")) {
    document.documentElement.lang = "es-MX";
  } else {
    document.documentElement.lang = "en-US";
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    supportedLngs: ["es", "en"],
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "fw-calculator-lang",
    },
  });

setDocumentLang(i18n.language);
i18n.on("languageChanged", setDocumentLang);

export default i18n;
