/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../Components/IsUserLoggedIn";
import BlueButton from "../Components/BlueButton";

import AuthContext from "../context/AuthProvider";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState(""); // the email the user uses to try to login with, also the same email that is sent to the backend
  const [pwd, setPwd] = useState(""); // password the user inputs and the password that is sent to backend
  const [error, setError] = useState(""); // State to handle error

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    //setError(""); // Återställ tidigare felmeddelanden vid varje inloggningsförsök
    /*
    if (!userEmail || userEmail.trim() === "") {
      setError("Username cannot be empty.");
      return;
    }
    if (!inputPassword || inputPassword.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }
    */

    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ user, pwd }),
      });
      const body = await response.json();
      const token = body.token;

      //const role = response?.data?.roles;

      if (response.status === 200) {
        console.log("success code 200");
        //navigate("/");
        console.log(token);
        setAuth({ user, pwd, token });
        setUser("");
        setPwd("");
        setSuccess(true);
        //isUserLoggedIn(token);
      }
    } catch (err) {
      if (!err.response) {
        setError("No Server response");
      } else if (err.response?.status === 400) {
        setError("Missing username or password");
      } else if (err.response?.status === 401) {
        setError("Unathorized");
      } else if (err.response?.status === 500) {
        setError("Internal Server Error");
      } else {
        setError("An error occurred while logging in.");
      }
      errRef.current.focus();
    }
  };
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div>
      {success ? (
        <div>
          <p>Du lyckades logga in</p>
          <BlueButton
            title="Go to Home Page"
            onClick={routeChange}
          ></BlueButton>
        </div>
      ) : (
        <div className="py-28">
          <div className="w-full max-w-xs m-auto bg-slate-50 rounded p-5">
            <header>
              <img
                className="w-30 mx-auto blend-multiply"
                src="/blabar.png"
                alt="icon"
              />
            </header>
            <form onSubmit={handleLogin}>
              <div>
                <label className="block mb-2 text-green-950" htmlFor="username">
                  Email
                </label>
                <input
                  className="w-full p-2 mb-6 text-green-950 border-b-2 border-lime-700 outline-none focus:bg-gray-300"
                  type="userEmail"
                  name="userEmail"
                  value={user}
                  ref={userRef}
                  required
                  onChange={(e) => setUser(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-green-950" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full p-2 mb-6 text-green-950 border-b-2 border-lime-700 outline-none focus:bg-gray-300"
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  name="password"
                  required
                ></input>
              </div>
              <div>
                <input
                  className="w-full bg-lime-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded"
                  type="submit"
                ></input>
              </div>
            </form>
            {error && <p className="text-lime-700">{error}</p>}
            <div className="pb-4">
              <Link
                to="/forgot-password"
                className="text-green-950 hover:text-lime-700 text-sm float-left"
              >
                Forgot Password?
              </Link>
              <Link
                to="/pages/create-account"
                className="text-green-950 hover:text-lime-700 text-sm float-right"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
