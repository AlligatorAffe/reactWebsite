/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { userInfo } = require("os");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  console.log(
    "------------------------------inne i refresh---------------------------------------------------"
  );

  console.log("cookies i refresh", cookies);

  if (!cookies?.jwt) {
    console.log("inne i cookies error ");
    return res.sendStatus(401);
  }
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log("founduser", foundUser);
  console.log("refreshtoken", refreshToken);
  if (!foundUser || foundUser.refreshToken !== refreshToken) {
    return res.sendStatus(403);
  }

  //EVALUATE JWT

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
