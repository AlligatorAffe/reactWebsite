const express = require("express");
const router = express.Router();

const auth = require("./authentication");

// Login-route
router.post("/session", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin@admin.com" && password === "admin") {
    //const token = auth.generateToken({ username });
    const token = authenticateToken;
    //res.cookie("auth_token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ message: "Inloggning lyckades" });
  } else {
    res.status(401).send("Wrong Email or Password");
  }
});

module.exports = router;
