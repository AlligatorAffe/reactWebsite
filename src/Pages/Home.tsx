import { useState } from "react";

function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Lägg till ett laddningsstatus

  function fetchMessage() {
    console.log("inne i fetch message");
    setIsLoading(true); // Starta laddningen
    fetch("http://localhost:8080/Message")
      .then((response) => {
        if (response.ok) {
          return response.json(); // Fortsätt bara om svaret är OK
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMessage(data.text); // Antag att 'data' innehåller ett fält 'message'
        setIsLoading(false); // Stoppa laddningen
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Stoppa laddningen även vid fel
        // Det är bättre att hantera felmeddelanden som en state-variabel istället för att använda en array 'errors'
      });
  }

  return (
    <>
      <div>
        {isLoading ? (
          <p>Laddar...</p>
        ) : (
          <button
            onClick={fetchMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            HÄMTA MEDDELANDE
          </button>
        )}
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Home;
