/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const jwt = require("jsonwebtoken");

// Verification of JWT
const verifyJWT = (req, res, next) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(
    "-----------------------------------------------------------------"
  );
  console.log(authHeader);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;

/*
  // eslint-disable-next-line no-undef
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  const token = req.header(tokenHeaderKey);
  
  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) {
    return res.send("Successfully Verified");
  } else {
    // Access Denied
    console.log("i denna fitt funktionen")
    return res.status(401).send(error);
  }

});

  */