import { Component } from "react";
import { Link } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/userModel";
import store from "../../../Redux/Store";
import { userLoggedOut } from "../../../Redux/userState";
import { socketInit } from "../../../Socket.io/SocketManger";
import "./Menu.css";
interface MenuState {
   user: UserModel;
}

class Menu extends Component<{}, MenuState> {
   private unsubscribe: Unsubscribe;

   public constructor(props: {}) {
      super(props);
      this.state = {
         user: store.getState().userState.user,
      };
   }

   public componentDidMount(): void {
      this.unsubscribe = store.subscribe(() => {
         this.setState({ user: store.getState().userState.user }, () => {});
      });
   }

   public componentWillUnmount():void {
       this.unsubscribe()
   }
   
   private logout = () => {
      if (!sessionStorage.getItem("user")) return;

      store.dispatch(userLoggedOut());
      sessionStorage.removeItem("user");
      socketInit.disconnect();

   };

   public render(): JSX.Element {
      return (
         <>
            <div className='container'>
               <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
                  <Link className='navbar-brand' to={"/auth/sign-up"}>
                     Tag And Fly
                  </Link>

                  <div
                     className='collapse navbar-collapse'
                     id='navbarTogglerDemo02'>
                     <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                           {this.state.user && this.state.user.isLoggedIn ? (
                              <Link
                                 className='nav-link'
                                 to={"/auth/sign-in"}
                                 onClick={this.logout}>
                                 Log out
                              </Link>
                           ) : (
                              <Link className='nav-link' to={"/auth/sign-in"}>
                                 Sign in
                              </Link>
                           )}
                        </li>
                        <li className='nav-item'>
                           {this.state.user && this.state.user.isLoggedIn ? (
                              ""
                           ) : (
                              <Link
                                 className='nav-link pl-2'
                                 to={"/auth/sign-up"}>
                                 Register
                              </Link>
                           )}
                        </li>
                        <li className='nav-item'>
                           {this.state.user && this.state.user.isLoggedIn ? (
                              <div className='navbar-brand pl-2'>
                                 {this.state.user.userName}
                              </div>
                           ) : (
                              ""
                           )}
                        </li>
                     </ul>
                  </div>
               </nav>
            </div>
         </>
      );
   }
}

export default Menu;
