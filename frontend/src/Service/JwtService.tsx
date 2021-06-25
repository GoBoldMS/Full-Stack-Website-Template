import axios from "axios";
import store from "../Redux/Store";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use((request) => {
   if (store.getState().userState.user) {
      request.headers = {
         authorization: "Bearer " + store.getState().userState.user.token,
      };
   }

   return request;
});

export default jwtAxios;
