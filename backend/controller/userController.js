const User = require("../model/User");

const handleFetchUsers = async (req, res) => {
  const cookies = req.cookies;

  console.log(
    "------------------------------inne i fetch all users---------------------------------------------------"
  );
  console.log("cookien i user", cookies);

  // Om autentisering krävs, återaktivera denna kontroll
  /*
  if (!cookies?.jwt) {
    return res.sendStatus(401); // Använd return här för att avsluta funktionen om villkoret är sant
  }
  */

  try {
    const findAllUsers = await User.find({});
    // Antag att om find operationen lyckas, kommer vi alltid att ha en array (som kan vara tom)
    res.json(findAllUsers); // Använder direkt res.json för att skicka användardata
  } catch (error) {
    console.error("Error fetching users:", error);
    res.sendStatus(500); // Intern serverfel, t.ex. databasfråga misslyckades
  }
};

module.exports = { handleFetchUsers };
