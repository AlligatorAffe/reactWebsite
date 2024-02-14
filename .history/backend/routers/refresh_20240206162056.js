/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");


router.post('/', authController.handleRefreshToken);

module.exports = router;