const crypto = require("crypto");

function hashPassword(plainText) {
   if (!plainText) return null;

   const salt = "SaltItHot_23M";

   return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
   hashPassword,
};
