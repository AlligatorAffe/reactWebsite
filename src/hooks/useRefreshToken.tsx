import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch("http://localhost:8080/refresh", {
      method: "GET",
      credentials: "include", // inkludera cookies
    });
    const data = await response.json;
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.formData.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.formData.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
