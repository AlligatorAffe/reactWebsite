import { useEffect, useState } from "react";

export function isUserLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Här kan du lägga till ytterligare logik för att validera token om nödvändigt
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}
