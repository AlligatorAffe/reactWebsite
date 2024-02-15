import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const User = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // Lägg till ett laddningsstatus
  const [error, setError] = useState("");
  const refresh = useRefreshToken();

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

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p> No users to display </p>
      )}
      <button onClick={() => refresh()}>refresh</button>
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
