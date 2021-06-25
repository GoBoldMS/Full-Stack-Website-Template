import "./SignUp.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/userModel";
import axios from "axios";
import globals from "../../../Service/globals";
import { useEffect, useState } from "react";
import Cookie from "universal-cookie" ;
import notify from "../../../Service/Notify";

function SignUp(): JSX.Element {


   const history = useHistory();
   const { register, handleSubmit } = useForm<UserModel>();

   const [captcha, setCaptcha] = useState("<svg>");

   useEffect(() => {
    const cookie = new Cookie();
      axios
         .get(globals.urlAuth + "/captcha")
         .then((c) => {
            setCaptcha(c.data[0]);
            cookie.set("captcha", c.data[1]);
         })
         .catch((e) => console.log(e));
   },[]);

   async function addUser(user: UserModel) {
      try {

         await axios.post<UserModel>(globals.urlAuth + "/register", user, {
            headers: {
                authorization: "Bearer " + document.cookie
              }
         });
         notify.success("You have successfully registered.");
         history.push("/auth/sign-in");
      } catch (err) {
          console.log(err.message)
         notify.error(err || err.message);
      }
   }

   return (
      <div className='SignUp'>
         <br />
         <br />
         <br />
         <br />
         <br />
         <div className='outer'>
            <div className='inner'>
               <form onSubmit={handleSubmit(addUser)}>
                  <h3>Register</h3>

                  <div className='form-group'>
                     <label>First name</label>
                     <input
                        type='text'
                        className='form-control'
                        placeholder='First name'
                        {...register("firstName")}
                        autoFocus
                     />
                  </div>

                  <div className='form-group'>
                     <label>Last name</label>
                     <input
                        type='text'
                        className='form-control'
                        placeholder='Last name'
                        {...register("lastName")}
                     />
                  </div>

                  <div className='form-group'>
                     <label>User name</label>
                     <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Your Username'
                        {...register("userName")}
                     />
                  </div>

                  <div className='form-group'>
                     <label>Password</label>
                     <input
                        type='password'
                        className='form-control'
                        placeholder='Enter password'
                        {...register("password")}
                     />
                  </div>

                  <div className='form-group'>
                     <label>Captcha</label>
                     <div dangerouslySetInnerHTML={{__html:captcha}}></div>

                     <input
                        type='text'
                        className='form-control'
                        {...register("captcha", { required: true })}
                     />
                  </div>

                  <button
                     type='submit'
                     className='btn btn-dark btn-lg btn-block'>
                     Register
                  </button>
                  <p className='forgot-password text-right'>
                     Already registered{" "}
                     <NavLink to='/auth/sign-in'>login?</NavLink>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
}

export default SignUp;
