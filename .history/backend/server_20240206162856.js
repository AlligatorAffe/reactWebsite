/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const loginRoutes = require("./routers/login");
//const verifyToken = require("./routers/authentication");
const cors = require("cors");

const verifyJWT = require('./middleware/verifyJWT');
//import authRoutes from "./routers/authentication";

//const { generateToken, verifyToken } = require("./auth");

const app = express();
const port = process.env.PORT || 8080; // Du kan välja vilken port som helst

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/login", loginRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (request, response, next) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "*");
  response.set("Access-Control-Allow-Headers", "*");
  response.set("Access-Control-Expose-Headers", "*");
  next();
});



//--------------------Middleware for Cookies---------------




//--------------------Middleware for Cookies---------------


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

///--------------------Routes--------------------------------
app.use('/register', require('./routers/register'));
app.use('/auth', require('./routers/auth'));
app.use('/refresh', require('./routers/refresh'))
//---------------------Routes----------------------------------

// Generating JWT
app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  console.log("häääär")
  const { username, password } = req.body;
  if (username === "admin@admin.com" && password === "admin") {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: 12,
    };

    const token = jwt.sign(data, jwtSecretKey);

    // Skicka tillbaka både token och statuskod 200 om autentiseringen är framgångsrik
    res.status(200).json({ token }); // Använd json() för att skicka JSON-svar
  } else {
    // Skicka en 401-statuskod och ett felmeddelande om autentiseringen misslyckas
    res.status(401).json({ error: "Wrong Email or Password" });
  }
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  // eslint-disable-next-line no-undef
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      console.log("i denna fitt funktionen")
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    console.log("i denna fitt funktionen222")
    return res.status(401).send(error);
  }
});




app.get("/protectedRoute", verifyJWT, (req, res) => {
  res.send("Denna sida är skyddad och du är autentiserad!");
});


