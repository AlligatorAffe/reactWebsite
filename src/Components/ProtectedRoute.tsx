import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./IsUserLoggedIn"; // Uppdatera sökvägen efter behov

export function ProtectedRoute({ children }) {
  const loggedIn = isUserLoggedIn();

  if (!loggedIn) {
    // Om inte inloggad, omdirigera till /login
    return <Navigate to="/login" />;
  }

  return children; // Om inloggad, rendera barnkomponenterna
}
