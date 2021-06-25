const vacationLogic = require("../business-logic/vacations-logic");

async function patchFixerAsync(patchedObj) {
   try {
      const vacationToPatch = await vacationLogic.getVacation(
         patchedObj.vacationId
      );

      for (prop in patchedObj) {
         for (toPatchProp in vacationToPatch[0]) {
            if (patchedObj[prop] === "" && prop === toPatchProp) {
               patchedObj[prop] = vacationToPatch[0][toPatchProp];
            }
         }
      }
      
   } catch (err) {
      console.log(err);
   }
}

module.exports = patchFixerAsync;
