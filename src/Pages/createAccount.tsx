import { useState } from "react";

import { Link } from "react-router-dom";

function CreateAccount() {
  const loggedIn = false;
  const [createdAccount, setCreatedAccount] = useState(false); //Bara en boolean för att visa att via har lyckats skapa ett konto!
  const [userPassword, setUserPassword] = useState(""); //användares password
  const [validatePassword, setValidatePassword] = useState(""); // kolla så användare har skrivit in rätt lösen två gånger.
  const [accountUsername, setAccountUsername] = useState(""); //account username
  const [firstName, setFirstName] = useState(""); //användarens förnamn
  const [lastName, setLastName] = useState(""); //användarens efternamn
  const [accountEmail, setAccountEmail] = useState(""); // användarens email.

  const [error, setError] = useState("");

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (userPassword !== validatePassword) {
      setError("The passwords need to match");
      return;
    }
    if (userPassword.length < 7) {
      setError("The password need to be more than 6 characters");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: accountUsername,
          pwd: userPassword,
          email: accountEmail,
          firstName: firstName,
          lastName: lastName,
        }),
      });

      if (response.status === 201) {
        console.log("Account successfully created!");
        setCreatedAccount(true);
      } else if (response.status === 400) {
        setError("Missing password or Username");
      } else if (response.status === 401) {
        setError("Unauthorized");
      } else if (response.status === 409) {
        setError("This account is alredy in use");
      } else if (response.status === 500) {
        setError("internal server error");
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { status?: number } };
        if (!err.response.status) {
          setError("An unexpected error occurred");
        }
      }
    }
  };
  return (
    <div>
      {createdAccount ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-green-600 text-xl font-bold mb-4">
            You created an account. Welcome.
          </p>
          <Link to="/">
            <img
              src="/blabarOchLingon.webp"
              alt="Beskrivning"
              className="w-28 mx-auto blend-multiply"
            />
          </Link>
        </div>
      ) : (
        <div className="flex pt-24 pb-32 justify-center bg-gray-100">
          {loggedIn ? (
            <p>Du är inloggad!</p>
          ) : (
            <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
              <h1 className="text-xl font-bold mb-4">Create account!</h1>
              <form onSubmit={handleCreateAccount} className="w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  value={accountUsername}
                  onChange={(e) => setAccountUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  value={accountEmail}
                  onChange={(e) => {
                    setAccountEmail(e.target.value);
                    setError(""); // Rensa felmeddelandet när användaren börjar skriva
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Firstname"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="password1"
                  autoComplete="false"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                    setError("");
                  }}
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  required
                />
                <input
                  type="password"
                  id="password2"
                  autoComplete="false"
                  placeholder="Repeat Password"
                  value={validatePassword}
                  onChange={(e) => {
                    setValidatePassword(e.target.value);
                    setError("");
                  }}
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                  required
                />
                <input
                  className="w-full bg-lime-700 hover:bg-green-700 text-white font-bold py-2 px-4 mb-6 rounded"
                  type="submit"
                  value="Create Account" // Added a value for clarity
                />
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
