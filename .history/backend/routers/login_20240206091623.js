const { error } = require("console");
const express = require("express");
const router = express.Router();

// Login-route
router.post("/login", (req, res) => {
  console.log("inne i gamla login jäveln !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  
  const { username, password } = req.body;
  
  console.log(username,password)
  if (username === "admin@admin.com" && password === "admin") {
    res.json({ message: "Inloggning lyckades" });
  } else {
    res.status(401).send("Wrong Email or Password");
  }
});

module.exports = router;




router.post("/login" , async (req,res) =>{
  const { email, password} = req.body;

  const userWithEmail = await User.findOne({where: {email}}).catch(
    (error) =>{
      console.log("Error ", error);
    }
  );
  if(!userWithEmail){
    return res
      .status(400)
      .json({message: "Email or password does not match!"});
  }
  if ( userWithEmail.password !== password){
    return res
      .status(400)
      .json({message: "Email or password does not match!"})
  }

  //skicka vidare för att skapa token eller skapa den här. 
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email}
    process.env.JWT_SECRET_KEY
  );

  res.json({message: "welcome back!", token: jwtToken})
})

export default router;