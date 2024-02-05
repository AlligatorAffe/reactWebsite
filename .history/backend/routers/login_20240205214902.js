const express = require("express");
const router = express.Router();

//const auth = require("./authentication");

// Login-route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin@admin.com" && password === "admin") {
    res.json({ message: "Inloggning lyckades" });
  } else {
    res.status(401).send("Wrong Email or Password");
  }
});

module.exports = router;
