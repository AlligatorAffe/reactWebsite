/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */


const userDB = {
	users: require("../model/users.json"),
	setUsers: function (data){ this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser =async ( req, res) =>{
	const {user, pwd } = req.body;
}