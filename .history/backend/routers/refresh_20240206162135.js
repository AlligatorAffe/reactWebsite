/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const refreshTokenController = require("../controller/refreshTokenController");


router.post('/', refreshTokenController.handleRefreshToken);

module.exports = router;