/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */



const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data){ this.users = data}
}




const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt){
		return res.sendStatus(401);
	}
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;


	const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
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
		//saving refreshtoken with current user
		const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
		const currentUser = { ...foundUser, refreshToken};
		usersDB.setUsers([...otherUsers, currentUser]);
		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);
		res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
		res.json({'success': `User ${user}is logged in!`, accessToken });
	} else {
		res.sendStatus(401);
	}
}



module.exports = {handleLogin};