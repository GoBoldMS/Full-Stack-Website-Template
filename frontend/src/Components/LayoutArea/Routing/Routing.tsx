import { Redirect, Route, Switch } from "react-router";
import Login from "../../AuthArea/Login/Login";
import SignUp from "../../AuthArea/SignUp/SignUp";

import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import AdminHomeCC from "../../AdminArea/AdminHomeCC/AdminHomeCC";
import HomeUserPage from "../../HomeUserPage/HomeUserPage";
import Reports from "../../AdminArea/Reports/Reports";
import Page404 from "../../SharedArea/page404/page404";

function Routing(): JSX.Element {
   return (
      <Switch>
         <Route path='/edit' component={EditVacation} exact />
         <Route path='/admin-home/reports' component={Reports} exact />
         <Route path='/admin-home' component={AdminHomeCC} exact />
         <Route path='/home' component={HomeUserPage} exact />
         <Route path='/auth/sign-up' component={SignUp} exact />
         <Route path='/auth/sign-in' component={Login} exact />
         <Redirect from='/' to='/auth/sign-in' exact />
         <Route component={Page404} exact />
      </Switch>
   );
}

export default Routing;
