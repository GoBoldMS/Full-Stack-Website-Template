const joi = require("joi");

class UserModel {
   constructor(userModel) {
      this.userId = userModel.userId;
      this.uuid = userModel.uuid;
      this.firstName = userModel.firstName;
      this.lastName = userModel.lastName;
      this.userName = userModel.userName;
      this.password = userModel.password;
      this.isAdmin = userModel.isAdmin;
   }

   static #registerValidation = joi.object({
      userId: joi.forbidden(),
      uuid: joi.forbidden(),
      firstName: joi.string().min(3).max(30).required(),
      lastName: joi.string().min(3).max(30).required(),
      userName: joi.string().min(3).max(15).required(),
      password: joi.string().min(9).required(),
      isAdmin: joi.forbidden(),
   });

   registerValidation() {
      const result = UserModel.#registerValidation.validate(this, {
         abortEarly: false,
      });
      if (result.error) return result.error.message;

      if (!/^[A-Z]/.test(this.password))
         return "Password must have at least one capital latter";

      return null;
   }
}

module.exports = UserModel;
