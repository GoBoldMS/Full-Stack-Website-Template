import UserModel from "../Models/userModel";

export class UserState {
   public user: UserModel = null;
   public constructor() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
         this.user = user;
      }
   }
}

export enum UserActionType {
   UserLoggedIn = "UserLoggedIn",
   UserLoggedOut = "UserLoggedOut",
}

export interface UserAction {
   type: UserActionType;
   payload?: any;
}

export function userLoggedIn(user: UserModel): UserAction {
   return { type: UserActionType.UserLoggedIn, payload: user };
}

export function userLoggedOut(): UserAction {
   return { type: UserActionType.UserLoggedOut };
}

export function userReducer(
   currentState: UserState = new UserState(),
   action: UserAction
): UserState {
   const newState = { ...currentState };

   switch (action.type) {
      case UserActionType.UserLoggedIn:
         newState.user = action.payload;
         sessionStorage.setItem("user", JSON.stringify(newState.user));
         break;

      case UserActionType.UserLoggedOut:
         newState.user = null;
   }

   return newState;
}
