/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/", userController.handleFetchUsers);

module.exports = router;
