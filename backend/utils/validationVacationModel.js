const joi = require("joi");

class VacationModel {
   constructor(vacation) {
      this.vacationId = +vacation.vacationId;
      this.vacationName = vacation.vacationName;
      this.description = vacation.description;
      this.destination = vacation.destination;
      this.endDate = vacation.endDate;
      this.startDate = vacation.startDate;
      this.image = vacation.image;
      this.price = vacation.price;
   }

   static #postValidation = joi.object({
      vacationId: joi.forbidden(),
      vacationName: joi.string().min(5).required(),
      description: joi.string().min(10).required(),
      destination: joi.string().required(),
      startDate: joi.date().required(),
      endDate: joi.string().required(),
      image: joi.string().optional(),
      price: joi.number().positive().required(),
   });

   static #patchValidation = joi.object({
      vacationId: joi.number().positive().required(),
      vacationName: joi.string().min(5).required(),
      description: joi.string().optional(),
      destination: joi.string().required(),
      startDate: joi.date().required(),
      endDate: joi.date().required(),
      price: joi.number().positive().required(),
      image: joi.optional(),
   });

   postValidation() {
      const result = VacationModel.#postValidation.validate(this, {
         abortEarly: false,
      });
      if (result.error) return result.error.message;
      if (Date.parse(this.endDate) < Date.parse(this.startDate))
         return " End date must be after or equal start date.";

      return null;
   }

   patchValidation() {
      const result = VacationModel.#patchValidation.validate(this, {
         abortEarly: false,
      });
      if (result.error) return result.error.message;
      if (Date.parse(this.endDate) < Date.parse(this.startDate))
         return "Start date must be before or equal to end date.";

      return null;
   }
}

module.exports = VacationModel;
