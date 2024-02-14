const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { request } = require("http");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const loginRoutes = require("./routers/login");
const verifyToken = require("./routers/authentication");
//import authRoutes from "./routers/authentication";

//const { generateToken, verifyToken } = require("./auth");

const app = express();
const port = process.env.PORT || 8080; // Du kan välja vilken port som helst

app.use(bodyParser.json());
app.use(cookieParser());
app.use(loginRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (request, response, next) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "*");
  response.set("Access-Control-Allow-Headers", "*");
  response.set("Access-Control-Expose-Headers", "*");
  next();
});

//app.use("/api", authRoutes);

//const auth = require("./routers/authentication");



// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");



app.use(cors());


/*

app.get("/protected", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    verifyToken(token);
    res.send("Hemlig information");
  } catch (error) {
    res.status(401).send("Unvalid token");
  }
});
*/

app.get("/Message", (req, res) => {
  console.log("Received GET request");

  try {
    const message = { text: "NU HÄMTAR VI GREJER FRÅN BACKENDEN" }; // Gör detta till ett objekt
    console.log("Sending 200");
    res.status(200).json(message); // Skicka ett objekt till .json()
  } catch (error) {
    console.error("Sending 500", error);
    res.status(500).end();
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isAuthenticated = auth.authenticateUser(username, password);
  if (isAuthenticated) {
    res.send("Login Successful");
  } else {
    res.status(401).send("Authentication Failed");
  }
});

// Generating JWT
app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});

app.get("/protectedRoute", verifyToken, (req, res) => {
  res.send("Denna sida är skyddad och du är autentiserad!");
});

//-----------------------------------------
app.post("/login/session", async (req, res, next) => {
  let { email, password } = req.body;

  // Hårdkodade användaruppgifter
  const hardcodedUser = {
    email: "admin@admin.com", // Förändrad från "username" till "email" för konsistens
    password: "admin",
    id: "12345", // Ett exempel på användar-id
  };

  // Kontrollerar om de inmatade uppgifterna matchar de hårdkodade uppgifterna
  if (email !== hardcodedUser.email || password !== hardcodedUser.password) {
    const error = new Error("Wrong details, please check at once");
    return next(error);
  }

  let token;
  try {
    // Skapar jwt token
    token = jwt.sign(
      {
        userId: hardcodedUser.id,
        email: hardcodedUser.email,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: hardcodedUser.id,
      email: hardcodedUser.email,
      token: token,
    },
  });
});
