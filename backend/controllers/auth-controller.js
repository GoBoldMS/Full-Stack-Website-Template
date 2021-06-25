const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const ServerErrors = require("../utils/errors-settings");
const SvgCaptcha = require("svg-captcha");
const crypto = require("../utils/crypto");
const verifyCaptcha = require("../middleware/verify-captcha");
const UserModel = require("../utils/validationUserModel");

const router = express.Router();

router.get("/captcha", (request, response) => {
   const captcha = SvgCaptcha.create();
   const image = captcha.data;
   const text = captcha.text;
   const hashedText = crypto.hashPassword(text);

   response.type("svg").send([image, hashedText]);
});

router.post("/login", async (request, response) => {
   try {
      const loggedInUser = await authLogic.loginAsync(request.body);
      if (!loggedInUser)
         return response.status(401).send("Wrong user name or password");
      response.json(loggedInUser);
   } catch (err) {
      response.status(500).send(ServerErrors.error(err.message));
   }
});

router.post("/register", verifyCaptcha ,async (request, response) => {
   try {
      const user = new UserModel(request.body);
      delete user.userId && user.uuid && user.uuid;

      const errors = user.registerValidation();

      if (errors) return response.status(400).send(ServerErrors.error(errors));

      const registeredUser = await authLogic.registerAsync(user);
      response.status(201).json(registeredUser);
   } catch (err) {
      response.status(500).send(ServerErrors.error(err.message));
   }
});

module.exports = router;

 
