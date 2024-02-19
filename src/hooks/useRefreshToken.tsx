import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch("http://localhost:8080/refresh", {
      method: "GET",
      credentials: "include", // inkludera cookies
    });
    const data = await response.json(); // Fixad funktion anrop
    setAuth((prev) => {
      console.log("loggar min refreshToken ", data.accessToken); // Fixad datavariabel användning
      return { ...prev, accessToken: data.accessToken }; // Fixad datavariabel användning
    });
    return data.accessToken; // Fixad datavariabel användning
  };
  return refresh;
};

export default useRefreshToken;
