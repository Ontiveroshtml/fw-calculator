import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pathFor } from "../routes";

/** Redirects to the same logical route using the current UI language’s URL shape. */
export function LocalizedRedirect({ routeId }) {
  const { i18n } = useTranslation();
  const lng = i18n.resolvedLanguage || i18n.language;
  return <Navigate to={pathFor(routeId, lng)} replace />;
}
