import { io, Socket } from "socket.io-client";
import VacationsModel from "../Models/vacationModel";
import store from "../Redux/Store";
import globals from "../Service/globals";
import {
   FallowTagAdded,
   UnFallow,
   VacationAdded,
   VacationDeleted,
   VacationUpdated,
} from "../Redux/vacationsState";

class SocketManger {
   public constructor() {
      this.connect();
   }

   private socket: Socket;

   public connect(): void {
      this.socket = io(globals.urlGeneral);

      this.socket.on(
         "msg-from-server-vacation-added",
         (addedVacation: VacationsModel) => {
            store.dispatch(VacationAdded(addedVacation));
         }
      );

      this.socket.on(
         "msg-from-server-vacation-updated",
         (updatedVacation: VacationsModel) => {
            store.dispatch(VacationUpdated(updatedVacation));
         }
      );

      this.socket.on("msg-from-server-vacation-deleted", (id: number) => {
         store.dispatch(VacationDeleted(id));
      });

      this.socket.on(
         "msg-from-server-fallow",
         (updatedFallowTags: VacationsModel) => {
            store.dispatch(FallowTagAdded(updatedFallowTags));
         }
      );

      this.socket.on(
         "msg-from-server-unFallow",
         (updatedFallowTags: VacationsModel) => {
            store.dispatch(UnFallow(updatedFallowTags));
         }
      );
   }

   public disconnect(): void {
      this.socket.disconnect();
   }
}

export default SocketManger;

export const socketInit = new SocketManger();
