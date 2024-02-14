/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */



const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data){ this.users = data}
}


const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require("path")

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd){
        return res.status(400).json({'message':`Username and password are required.`});
    }
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser){
        return res.sendStatus(401); 
    }
    //EVALUATE PASSWORD
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        //create JWt

        const accessToken = jwt.sign(
            {"username": foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        res.json({'success': `User ${user}is logged in!` });
    } else {
        res.sendStatus(401);
    }
}



module.exports = {handleLogin};