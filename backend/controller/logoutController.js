/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const User = require("../model/User");

const handleLogout = async (req, res) => {
  //On client, also delete the accesstoken
  const cookies = req.cookies;

  console.log(cookies);
  if (!cookies?.jwt) {
    console.log("inne i logout if no cookie.");
    return res.sendStatus(204); //no content
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  //Delete refreshToken in Db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
