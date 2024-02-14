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

const handleNewUser = async ( req, res) =>{
	const {user, pwd } = req.body;
	if(!user || !pwd) return res.status(400).json({'message': "username and password is required"});
	//check for duplicates in db
	const duplicates = usersDB.users.find(person => person.username === user);
	if ( duplicates){
		return res.sendStatus(409);
	}
	try{
		//ecrypt the password
		const hashedPwd = await bcrypt.hash(pwd,10);
		//store new user 
		const newUser = { "username": user, "password": hashedPwd};
		userDB.setUsers([...usersDB.users,newUser]);
		await fsPromises.writeFile(
			path.join(__dirname,'..','model','users.json'),
			JSON.stringify(usersDB.user);
		);
		console.log(usersDB.users);
		res.status(201).json({'success': `New user ${user} created!`});
	}catch(err){
		res.status(500).json({'message': err.message});
	}
}

module.exports= {handleNewUser};