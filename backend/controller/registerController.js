/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, email, firstName, lastName } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password is required" });
  //check for duplicates in db
  //const duplicates = await User.findOne({ username: user }).exec();
  //const dubEmail = await User.findOne({email : email}).exec();

  const existingUser = await User.findOne({
    $or: [{ username: user.toLowerCase() }, { email: email.toLowerCase() }],
  }).exec();

  if (existingUser || user.toLowerCase() === "admin") {
    return res.sendStatus(409);
  }
  try {
    //ecrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store new user
    const result = await User.create({
      username: user.toLowerCase(),
      password: hashedPwd,
      email: email.toLowerCase(),
      name: firstName + " " + lastName,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

/*



const handleNewUser = async (req, res) => {
  const { accountUsername, userPssword, accountEmail, firstName, lastName } =
    req.body;
  if (!accountUsername || !userPssword)
    return res
      .status(400)
      .json({ message: "username and password is required" });
  //check for duplicates in db
  const duplicates = await User.findOne({ username: accountUsername }).exec();

  if (duplicates) {
    return res.sendStatus(409);
  }
  try {
    //ecrypt the password
    const hashedPwd = await bcrypt.hash(userPssword, 10);
    //create and store new user
    const result = await User.create({
      username: accountUsername,
      password: hashedPwd,
			email: accountEmail,
			name: firstName+" "+lastName
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

*/
