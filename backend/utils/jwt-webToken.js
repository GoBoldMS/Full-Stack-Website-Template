const jwt = require("jsonwebtoken");

function jwtToken(user) {
   return jwt.sign({ payload: user }, config.jwtKey, { expiresIn: "120m" });
}

module.exports = {
   jwtToken,
};
