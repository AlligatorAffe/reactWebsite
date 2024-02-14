import { useEffect, useState } from "react";

export function isUserLoggedIn(mytoken) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token")
    // Här kan du lägga till ytterligare logik för att validera token om nödvändigt
    if(mytoken != 0 ){
      console.log("hey hey")
    }

    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}
