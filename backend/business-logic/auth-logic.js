const dal = require("../data-access-layer/dal");
const crypto = require("../utils/crypto");
const newToken = require("../utils/jwt-webToken");
const uuid = require("uuid");

async function registerAsync(user) {
   user.password = crypto.hashPassword(user.password);

   user.uuid = uuid.v4();
   user.isAdmin = 0;

   const sql = "INSERT INTO users values(DEFAULT, ?,?,?,?,?,?)";
   const info = await dal.executeAsync(sql, [
      user.uuid,
      user.firstName,
      user.lastName,
      user.userName,
      user.password,
      user.isAdmin,
   ]);

   delete user.password;

   user.token = newToken.jwtToken(user);

   delete user.isAdmin;

   return user;
}

async function loginAsync(userCredentials) {
   userCredentials.password = crypto.hashPassword(userCredentials.password);

   const sql = `SELECT uuid, firstName, lastName, userName , isAdmin FROM users WHERE userName = ? AND password = ?`;
   const users = await dal.executeAsync(sql, [
      userCredentials.userName,
      userCredentials.password,
   ]);
   if (users.length === 0) return null;
   const user = users[0];

   user.token = newToken.jwtToken(user);

   return user;
}

module.exports = {
   loginAsync,
   registerAsync,
};
