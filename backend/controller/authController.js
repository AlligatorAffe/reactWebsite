/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: `Username and password are required.` });
  }
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    //Om det inte finns någon sådan
    //användare.
    return res.sendStatus(401);
  }
  //EVALUATE PASSWORD
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //create JWt
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refreshtoken with current user
    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();

    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
