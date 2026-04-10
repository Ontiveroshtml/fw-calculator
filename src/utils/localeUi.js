/** BCP 47 locale for numbers/dates in the UI. */
export function resolveUiLocale(i18nLanguage) {
  return i18nLanguage?.toLowerCase().startsWith("es") ? "es-MX" : "en-US";
}
