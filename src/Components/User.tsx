import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const User = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // Lägg till ett laddningsstatus
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController(); //axios grej

    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/fetchUsers", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });
        if (response.status === 401) {
          console.log("CANT FIND TOKEN!");
        }
        if (!response.ok) {
          console.log("failure");
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("Detta är all data!!!!!", data);
        if (isMounted) {
          setUsers(data);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred:", err);
          setError(err.message || "An error occurred while fetching");
        }
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteUser = async (userId) => {
    try {
      // Skicka en DELETE-begäran till din backend för att ta bort användaren
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        // Andra inställningar, såsom headers
      });
      if (!response.ok) throw new Error("Something went wrong");

      // Uppdatera UI efter borttagning
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="px-8">
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center px-2 py-1"
            >
              <span>{user.username}</span>
              <button
                onClick={() => deleteUser(user._id)}
                className=" bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p> No users to display </p>
      )}
    </article>
  );
};

export default User;

/*
const getUsers = async () => {
  try{
    const response = await axios.get('/users',{
      signal: AbortController.signal
    });
    console.log(response.data);
    isMounted && setUsers(response.data);
  } catch (err) {
    console.error(err);
  }
}
getUsers();
return () => {
  isMounted = false;
  AbortController.abort();
}
},[])
*/
