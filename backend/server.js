/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

dotenv.config();

//const verifyToken = require("./routers/authentication");
const cors = require("cors");

const verifyJWT = require('./middleware/verifyJWT');
const verifyRoles = require("./middleware/verifyRoles");
const ROLES_LIST = require("./config/roles_list");


const app = express();
const port = process.env.PORT || 8080; // Du kan välja vilken port som helst



app.use(bodyParser.json());



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], 
  credentials: true
}));


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


///--------------------Routes--------------------------------

app.use("/login", require("./routers/login"));
app.use('/register', require('./routers/register'));
app.use('/auth', require('./routers/auth'));
app.use('/refresh', require('./routers/refresh'));
app.use('/logout', require('./routers/logout'));
//---------------------Routes----------------------------------




app.get("/protectedRoute", verifyJWT, verifyRoles(ROLES_LIST.Admin) , (req, res) => {
  const test = req.cookies
  console.log(test)
  res.send("Denna sida är skyddad och du är autentiserad!" );
});






































app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
