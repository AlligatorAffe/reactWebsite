import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../Components/IsUserLoggedIn";

let inccorectUsernameOrPassword = false;
const errors = [];

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error
  const loggedIn = isUserLoggedIn();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("IsloggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: SyntheticEvent) => {
    if (!email || email.trim() === "") {
      errors.push("Username cannot be empty.");
      return;
    }
    if (!password || password.trim() === "") {
      errors.push("Password cannot be empty.");
      return;
    }
    if (inccorectUsernameOrPassword === true) {
      errors.push("Wrong Username or password");
      return;
    }
    e.preventDefault();
    try {
      console.log("detta är i email och password", email, password);
      const response = await fetch("http://localhost:8080/loginNumer2", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
      });
      const body = await response.json();
      switch (response.status) {
        case 200:
          navigate("/");
          console.log("success");
          break;
        case 400:
          errors.push("Incorreect username or password");
          break;
        case 401:
          errors.push("Incorrect username or password");
          inccorectUsernameOrPassword = true;
          break;
        case 500:
          errors.push(body.error); /*"Internal Server Error");*/
          break;
      }
    } catch (error) {
      errors.push(error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <p>Du lyckades logga in</p>
      ) : (
        <div className="py-28">
          <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
            <header>
              <style></style>
              <img
                className="w-30 mx-auto blend-multiply"
                src="/blabar.png"
                alt="icon"
              />
            </header>
            <form onSubmit={handleLogin}>
              <div>
                <label
                  className="block mb-2 text-indigo-500"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div>
                <label
                  className="block mb-2 text-indigo-500"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                ></input>
              </div>
              <div>
                <input
                  className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                  type="submit"
                ></input>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <footer>
              <Link
                to="/forgot-password"
                className="text-indigo-700 hover:text-pink-700 text-sm float-left"
              >
                Forgot Password?
              </Link>
              <Link
                to="/create-account"
                className="text-indigo-700 hover:text-pink-700 text-sm float-right"
              >
                Create Account
              </Link>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
