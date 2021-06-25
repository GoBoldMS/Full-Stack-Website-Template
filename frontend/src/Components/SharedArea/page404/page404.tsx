import { NavLink } from "react-router-dom";
import image from "../../../Assets/Image/emoji.png"
import "./page404.css";

function Page404(): JSX.Element {
   return (
      <div className='page404'>
         <div id='notfound'>
            <div className='notfound'>
               <div className='notfound-404' style={ {backgroundImage:image}}>
                   </div>
               <h1>404</h1>
               <h2>Oops! Page Not Be Found</h2>
               <p>
                  Sorry but the page you are looking for does not exist, have
                  been removed. name changed or is temporarily unavailable
               </p>
              <NavLink to="/home">Back to homepage</NavLink>
            </div>
         </div>
      </div>
   );
}

export default Page404;
