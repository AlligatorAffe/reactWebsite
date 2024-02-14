import { useEffect, useState } from "react";

export function isUserLoggedIn(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token")
    // Här kan du lägga till ytterligare logik för att validera token om nödvändigt
    if(token != 0 ){
      "hey hey"
    }

    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}
