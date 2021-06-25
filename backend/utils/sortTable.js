function sortTable(table, followers, taggedVacationsById, currentUser) {
   const sortedTable = [];

   for (v in table) {
      table[v].followers = 0;
      table[v].currentUserFallow = false;
      sortedTable.push(table[v]);
   }

   for (v in sortedTable) {
      for (f in followers) {
         if (sortedTable[v].vacationId === followers[f].vacationId) {
            sortedTable[v].followers = followers[f].count;
         }
      }
   }

   sortedTable.forEach((v) => {
      for (f in taggedVacationsById) {
         if (v.vacationId === taggedVacationsById[f].vacationId) {
            if (currentUser.uuid === taggedVacationsById[f].uuid) {
               v.currentUserFallow = true;

               const moveToStart = sortedTable.splice(
                  sortedTable.indexOf(v),
                  1
               )[0];
               sortedTable.splice(0, 0, moveToStart);
            }
         }
      }
   });

   return sortedTable;
}

module.exports = {
   sortTable,
};
