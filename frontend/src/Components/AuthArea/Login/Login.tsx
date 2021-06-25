import "./Login.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";

import UserModel from "../../../Models/userModel";
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../Service/globals";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import { userLoggedIn } from "../../../Redux/userState";
import { socketInit } from "../../../Socket.io/SocketManger";
import notify from "../../../Service/Notify";

function Login(): JSX.Element {
   const history = useHistory();

   const { handleSubmit, register } = useForm<UserModel>();

   async function loginUser(credentials: UserModel) {
      try {
         const user = await axios.post(globals.urlAuth + "/login", credentials);
         user.data.isLoggedIn = true;

         sessionStorage.setItem("user", JSON.stringify(user.data));
         socketInit.connect();

         store.dispatch(userLoggedIn(user.data));

         if (user.data.isAdmin === 0) {
            history.push("/home");
         } else {
            history.push("/admin-home");
         }
      } catch (err) {
         notify.error(err);
      }
   }

   return (
      <div className='Login'>
         <br />
         <br />
         <br />
         <br />
         <br />
         <div className='outer'>
            <div className='inner'>
               <form onSubmit={handleSubmit(loginUser)}>
                  <h3>Log in</h3>

                  <div className='form-group'>
                     <label>Username</label>
                     <input
                        type='text'
                        className='form-control'
                        placeholder='Enter username'
                        {...register("userName", { required: true })}
                        autoFocus
                     />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input
                        type='password'
                        className='form-control'
                        placeholder='Enter password'
                        {...register("password", { required: true })}
                     />
                  </div>

                  <div className='form-group'>
                     <div className='custom-control custom-checkbox'>
                        <input
                           type='checkbox'
                           className='custom-control-input'
                           id='customCheck1'
                        />
                        <label
                           className='custom-control-label'
                           htmlFor='customCheck1'>
                           Remember me
                        </label>
                     </div>
                  </div>

                  <button
                     type='submit'
                     className='btn btn-dark btn-lg btn-block'>
                     Sign in
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
