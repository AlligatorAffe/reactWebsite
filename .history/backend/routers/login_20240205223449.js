const express = require("express");
const router = express.Router();

// Login-route
router.post("/login", (req, res) => {
  console.log("inne i gamla login jäveln !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  c
  const { username, password } = req.body;

  onsole.log(username,password)
  if (username === "admin@admin.com" && password === "admin") {
    res.json({ message: "Inloggning lyckades" });
  } else {
    res.status(401).send("Wrong Email or Password");
  }
});

module.exports = router;
