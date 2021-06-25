import { BrowserRouter } from "react-router-dom";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
   return (
      <BrowserRouter>
         <div className='Layout'>
            <nav>
               <Menu />
            </nav>
            <br />
            <br />
            <br />
            <main>
               <Routing />
            </main>
         </div>
      </BrowserRouter>
   );
}

export default Layout;
