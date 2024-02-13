import { useState } from "react";
import BlueButton from "../Components/BlueButton";

function CreateAccount() {
  const loggedIn = false;
  const [createdAccount, setCreatedAccount] = useState(false);
  const [createPassword, setCreatePassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (createPassword !== validatePassword) {
      setError("The passwords need to match");
    } else {
      setCreatedAccount(true);
    }
  };
  return (
    <div>
      {createdAccount ? (
        <div>
          <p>You created an account. Good on you..</p>
          <img src="" alt="" />
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
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                />
                <input
                  type="password"
                  id="password1"
                  autoComplete="false"
                  placeholder="Password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
                />
                <input
                  type="password"
                  id="password2"
                  autoComplete="false"
                  placeholder="Repeat Password"
                  value={validatePassword}
                  onChange={(e) => setValidatePassword(e.target.value)}
                  className="input input-bordered w-full mb-4 hover:bg-slate-100"
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
