//import express from "express";
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secretKey = "din hemliga nyckel";

const ACCESS_TOKEN_SECRET = "oaipfgauighASHFjagh";

// Middleware för att verifiera token
function verifyToken(req, res, next) {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = req.header(tokenHeaderKey);

  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    req.user = verified; // Lägger till användarinformationen i request-objektet
    next(); // Fortsätter till nästa middleware/route handler
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = verifyToken;



module.exports= {
  let isAuthenticated;
  authenticateUser: function ( username, password){
    return isAuthenticated;
  }
}