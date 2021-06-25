import VacationsModel from "../Models/vacationModel";

export class VacationState {
   public vacation: VacationsModel[] = [];
}

export enum VacationActionType {
   getAllVacation = "getAllVacation",
   VacationAdded = "VacationAdded",
   VacationUpdated = "VacationUpdated",
   VacationDeleted = "VacationDeleted",
   FallowTagAdded = "FallowTagAdded",
   UnFallow = "UnFallow",
}

export interface VacationAction {
   type: VacationActionType;
   payload?: any;
}

export function downloadedVacations(
   vacation: VacationsModel[]
): VacationAction {
   return { type: VacationActionType.getAllVacation, payload: vacation };
}

export function VacationAdded(vacation: VacationsModel): VacationAction {
   return { type: VacationActionType.VacationAdded, payload: vacation };
}

export function VacationDeleted(id: number): VacationAction {
   return { type: VacationActionType.VacationDeleted, payload: id };
}

export function VacationUpdated(
   UpdatedVacation: VacationsModel
): VacationAction {
   return {
      type: VacationActionType.VacationUpdated,
      payload: UpdatedVacation,
   };
}

export function FallowTagAdded(
   FallowTagVacationId: VacationsModel
): VacationAction {
   return {
      type: VacationActionType.FallowTagAdded,
      payload: FallowTagVacationId,
   };
}

export function UnFallow(UnFallow: VacationsModel): VacationAction {
   return { type: VacationActionType.UnFallow, payload: UnFallow };
}

export function vacationReducer(
   currentState: VacationState = new VacationState(),
   action: VacationAction
): VacationState {
   const newState = { ...currentState };

   switch (action.type) {
      case VacationActionType.getAllVacation:
         newState.vacation = action.payload;
         break;

      case VacationActionType.VacationAdded:
         newState.vacation.push(action.payload);
         break;

      case VacationActionType.VacationUpdated:
         const index = newState.vacation.findIndex(
            (v) => v.vacationId === action.payload.vacationId
         );
         newState.vacation[index] = action.payload;
         break;

      case VacationActionType.VacationDeleted:
         const indexToDelete = newState.vacation.findIndex(
            (v) => v.vacationId === action.payload
         );
         newState.vacation.splice(indexToDelete, 1);
         break;

      case VacationActionType.FallowTagAdded:   
         const fallowTagIndex = newState.vacation.findIndex(
            (v) => v.vacationId === action.payload.vacationId
         );
         newState.vacation[fallowTagIndex].currentUserFallow = true;
         newState.vacation[fallowTagIndex].followers = action.payload.count;

         break;

      case VacationActionType.UnFallow:
     
         const unFallowTagIndex = newState.vacation.findIndex(
            (v) => v.vacationId === action.payload.vacationId
         );
         newState.vacation[unFallowTagIndex].currentUserFallow = false
         newState.vacation[unFallowTagIndex].followers = action.payload.count;
         
         break;
   }

   return newState;
}
