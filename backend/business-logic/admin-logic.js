const dal = require("../data-access-layer/dal");
const { sortTable } = require("../utils/sortTable");
const path = require("path");
const { safeDeleteAsync } = require("../utils/safeDelete");

async function addVacationAsync(vacation, image) {
   const sql = "INSERT INTO vacations VALUES(DEFAULT , ? , ? ,? , ? , ? , ? )";
   const info = await dal.executeAsync(sql, [
      vacation.vacationName,
      vacation.description,
      vacation.destination,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
   ]);

   vacation.vacationId = info.insertId;
   vacation.followers = 0;

   if (image) {
      const extension = image.name.substr(image.name.lastIndexOf("."));
      const fileName = vacation.vacationId + extension;
      vacation.image = fileName;
      const absolutePath = path.join(
         __dirname,
         "..",
         "images",
         "vacationsImage",
         fileName
      );
      await image.mv(absolutePath);
   }

   return vacation;
}

async function patchVacationAsync(patchedVacation, image) {
   const prams = [
      " vacationName = ?",
      ", description = ?",
      ", destination = ?",
      ", startDate = ?",
      ", endDate = ?",
      ", price = ?",
   ];

   const sql = `UPDATE vacations SET 
    ${prams[0]}  ${prams[1]} ${prams[2]} ${prams[3]} ${prams[4]}  ${prams[5]}  WHERE vacationId = ?`;
   const changedVacation = await dal.executeAsync(sql, [
      patchedVacation.vacationName,
      patchedVacation.description,
      patchedVacation.destination,
      patchedVacation.startDate,
      patchedVacation.endDate,
      +patchedVacation.price,
      patchedVacation.vacationId,
   ]);

   if (image) {
      const extension = image.name.substr(image.name.lastIndexOf("."));
      const fileName = patchedVacation.vacationId + extension;
      patchedVacation.image = fileName;
      const absolutePath = path.join(
         __dirname,
         "..",
         "images",
         "vacationsImage",
         fileName
      )
      await image.mv(absolutePath);
   }
   else{patchedVacation.image = patchedVacation.vacationId+".jpg"}

   return patchedVacation;
}

async function deleteVacation(vacationId) {
   const sql1 = "DELETE FROM taggedvacations where vacationId = ?";
   const sql2 = "DELETE FROM vacations WHERE vacationId = ?";
   await dal.executeAsync(sql1, [vacationId.vacationId]);
   await dal.executeAsync(sql2, [vacationId.vacationId]);

   const jpg = vacationId.vacationId + ".jpg";
   const absolutePath = path.join(
      __dirname,
      "..",
      "images",
      "vacationsImage",
      jpg
   );

   safeDeleteAsync(absolutePath);

   return vacationId;
}

async function getAllVacationsAsync() {
   const sql = `SELECT vacationId, vacationName , description , destination , concat(vacationId, '.jpg') AS image,DATE_FORMAT(startDate, "%d-%M-%Y") as 'startDate' ,DATE_FORMAT(endDate, "%d-%M-%Y")as 'endDate' , price from vacations`;
   const vacationsList = await dal.executeAsync(sql);
   const taggedVacations = await getAllFallowTagsAsync();
   const vacationsTaggedList = sortTable(vacationsList, taggedVacations);

   return vacationsTaggedList;
}

async function getAllFallowTagsAsync() {
   const sql = `SELECT uuid, vacations.vacationId , COUNT(vacations.vacationId) as count
    FROM vacations RIGHT JOIN taggedvacations on vacations.vacationId = taggedvacations.vacationId
    GROUP BY vacations.vacationId HAVING COUNT(vacations.vacationId) > 0`;
   const taggedVacations = await dal.executeAsync(sql);
   return taggedVacations;
}

module.exports = {
   addVacationAsync,
   patchVacationAsync,
   deleteVacation,
   getAllVacationsAsync,
   getAllFallowTagsAsync,
};
