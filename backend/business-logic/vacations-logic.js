const dal = require("../data-access-layer/dal");
const { sortTable } = require("../utils/sortTable");

async function getVacation(id) {
   const sql = `SELECT * FROM vacations WHERE  vacationId = ? `;
   const vacation = await dal.executeAsync(sql, id);
   return vacation;
}

async function getAllVacationsAsync(currentUser) {
   const sql = `SELECT vacationId, vacationName , description , destination , concat(vacationId, '.jpg') AS image 
    ,DATE_FORMAT(startDate, "%d-%M-%Y") as 'startDate' ,DATE_FORMAT(endDate, "%d-%M-%Y")as 'endDate' , price from vacations`;

   const vacationsList = await dal.executeAsync(sql);
   const taggedVacations = await getAllFallowTagsCountedAsync();
   const taggedVacationsById = await getAllFallowsTagAsync();

   const vacationsTaggedListSortedByUserFallowTags = sortTable(
      vacationsList,
      taggedVacations,
      taggedVacationsById,
      currentUser
   );
   return vacationsTaggedListSortedByUserFallowTags;
}

async function getAllFallowTagsCountedAsync() {
   const sql = `SELECT uuid, vacations.vacationId , COUNT(vacations.vacationId) as count
    FROM vacations RIGHT JOIN taggedvacations on vacations.vacationId = taggedvacations.vacationId
    GROUP BY vacations.vacationId HAVING COUNT(vacations.vacationId) > 0`;

   const taggedVacations = await dal.executeAsync(sql);
   return taggedVacations;
}

async function getAllFallowsTagAsync() {
   const sql = `SELECT * FROM taggedvacations`;

   const taggedVacations = await dal.executeAsync(sql);
   return taggedVacations;
}

async function fallowAsync(uuid, vacationId) {
   let newFallowTags = "";
   const sql = "INSERT INTO taggedvacations VALUES(?, ?)";
   await dal.executeAsync(sql, [uuid, vacationId]);
   const AllUpdatedFallowTags = await getAllFallowTagsCountedAsync();

   for (v in AllUpdatedFallowTags) {
      if (AllUpdatedFallowTags[v].vacationId === +vacationId) {
         newFallowTags = AllUpdatedFallowTags[v];
      }
   }

   return newFallowTags;
}

async function unFallowAsync(uuid, vacationId) {
   let newFallowTags = "";
   const sql = "DELETE FROM taggedvacations WHERE uuid = ? and vacationId = ?";
   await dal.executeAsync(sql, [uuid, vacationId]);
   const AllUpdatedFallowTags = await getAllFallowTagsCountedAsync();

   for (v in AllUpdatedFallowTags) {
      if (AllUpdatedFallowTags[v].vacationId === +vacationId) {
         newFallowTags = AllUpdatedFallowTags[v];
      }
   }
   if (newFallowTags === "")
      newFallowTags = { vacationId: +vacationId, count: 0 };

   newFallowTags.uuid = uuid;

   return newFallowTags;
}

module.exports = {
   getVacation,
   getAllVacationsAsync,
   getAllFallowTagsCountedAsync,
   fallowAsync,
   unFallowAsync,
   getAllFallowsTagAsync,
};
