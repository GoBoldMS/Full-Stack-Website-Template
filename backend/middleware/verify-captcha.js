const crypto = require("../utils/crypto");

function verifyCaptcha(request, response, next) {


   const originalText = request.headers.authorization.split("=")[1]



   let userText = request.body.captcha;
   userText = crypto.hashPassword(userText);
   if (userText !== originalText)
      return response.status(400).send("Wrong Captcha.");

   next();
}

module.exports = verifyCaptcha;
