/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../Components/IsUserLoggedIn";
import BlueButton from "../Components/BlueButton";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(""); // the email the user uses to try to login with, also the same email that is sent to the backend
  const [inputPassword, setInputPassword] = useState(""); // password the user inputs and the password that is sent to backend
  const [error, setError] = useState(""); // State to handle error

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const loggedIn = isUserLoggedIn();

  useEffect(() => {
    setError("");
  }, [userEmail, inputPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    //setError(""); // Återställ tidigare felmeddelanden vid varje inloggningsförsök

    if (!userEmail || userEmail.trim() === "") {
      setError("Username cannot be empty.");
      return;
    }
    if (!inputPassword || inputPassword.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${encodeURIComponent(
          userEmail
        )}&password=${encodeURIComponent(inputPassword)}`,
      });
      const body = await response.json();
      const token = body.token;

      switch (response.status) {
        case 200:
          console.log("success code 200");
          //navigate("/");
          setUserEmail("");
          setInputPassword("");
          setSuccess(true);
          isUserLoggedIn(token);
          break;
        case 400:
          setError("Incorrect username or password");
          break;
        case 401:
          setError("Incorrect username or password");
          break;
        case 500:
          setError(body.error); /*"Internal Server Error");*/
          break;
        default:
          setError("An error occurred while logging in.");
          break;
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };
  const routeChange = () =>{ 
    let path = "/"; 
    navigate(path);
  }

  return (
    <div>
      {success ? (
        <div>
          <p>Du lyckades logga in</p>
          <BlueButton title="Go to Home Page" onClick={routeChange}>

          </BlueButton>
        </div>
      ) : (
        <div className="py-28">
          <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
            <header>
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
                  type="userEmail"
                  name="userEmail"
                  value={userEmail}
                  ref={userRef}
                  required
                  onChange={(e) => setUserEmail(e.target.value)}
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
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  name="password"
                  required
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
