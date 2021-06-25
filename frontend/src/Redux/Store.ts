import { combineReducers, createStore } from "redux";
import { userReducer } from "./userState";
import { vacationReducer } from "../Redux/vacationsState";

const reducers = combineReducers({
   userState: userReducer,
   vacationState: vacationReducer,
});
const store = createStore(reducers);

export default store;
