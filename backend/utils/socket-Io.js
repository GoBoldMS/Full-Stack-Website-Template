const io = require("socket.io");

let socketsManger;

function init(listener) {
   socketsManger = io(listener, { cors: { origin: "*" } });

   socketsManger.sockets.on("connection", (socket) => {
      console.log(
         "Client Connected: " + socket.id + ". Total clients: ",
         socketsManger.engine.clientsCount
      );

      socket.on("disconnect", () =>
         console.log(
            "Client Disconnected " + socket.id + " . Total clients: ",
            socketsManger.engine.clientsCount - 1
         )
      );
   });
}

function vacationAdded(addedVacation) {
   socketsManger.sockets.emit("msg-from-server-vacation-added", addedVacation);
   console.log("vacation sent to client :" + addedVacation.vacationName);
}

function vacationUpdated(updatedVacation) {
   socketsManger.sockets.emit(
      "msg-from-server-vacation-updated",
      updatedVacation
   );
   console.log("updated Vacation sent to client :" + updatedVacation);
}

function vacationDeleted(id) {
   socketsManger.sockets.emit("msg-from-server-vacation-deleted", id);
}

function fallow(updatedFallowTags) {
   socketsManger.sockets.emit("msg-from-server-fallow", updatedFallowTags);
}

function unFallow(unFallowTag) {
   socketsManger.sockets.emit("msg-from-server-unFallow", unFallowTag);
}

module.exports = {
   init,
   vacationAdded,
   vacationUpdated,
   vacationDeleted,
   fallow,
   unFallow,
};
