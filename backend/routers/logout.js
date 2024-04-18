/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const logoutController = require("../controller/logoutController");


router.get('/', logoutController.handleLogout);

module.exports = router;



