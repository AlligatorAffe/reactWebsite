/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const registerController = require("../controller/registerController");


router.post('/', registerController.handleNewUser);

module.exports = router;