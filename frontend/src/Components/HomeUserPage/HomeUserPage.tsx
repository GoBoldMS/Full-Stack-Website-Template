import { Component, SyntheticEvent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Unsubscribe } from "redux";

import { History } from "history";
import VacationsModel from "../../Models/vacationModel";
import store from "../../Redux/Store";
import { downloadedVacations } from "../../Redux/vacationsState";
import globals from "../../Service/globals";
import jwtAxios from "../../Service/JwtService";
import VacationCard from "../LayoutArea/vacationCard/vacationCard";
import "./HomeUserPage.css";
import notify from "../../Service/Notify";

interface HomeUserPageProps {
   history: History;
}

interface HomeUserPageState {
   vacations: VacationsModel[];
}

class HomeUserPage extends Component<HomeUserPageProps, HomeUserPageState> {
   private unsubscribeStore: Unsubscribe;

   public constructor(props: HomeUserPageProps) {
      super(props);
      this.state = {
         vacations: store.getState().vacationState.vacation,
      };
   }

   public async componentDidMount() {
      try {
         if (!store.getState().userState.user) {
            this.props.history.push("/auth/sign-in");
            return;
         }

         this.unsubscribeStore = store.subscribe(() => {
            this.setState({
               vacations: store.getState().vacationState.vacation,
            });
         });

         const currentUser = JSON.parse(sessionStorage.getItem("user"));

         if (this.state.vacations.length === 0) {
            const response = await jwtAxios.post(
               globals.urlVacations + "/",
               currentUser
            );
            store.dispatch(downloadedVacations(response.data));
         }
      } catch (err) {
         notify.error(err);
      }
   }

   public componentWillUnmount(){
       this.unsubscribeStore();
   };


   private fallowAsync = async (args: SyntheticEvent) => {
      try {
         const uuid = store.getState().userState.user.uuid;
         const vacationId = (args.target as HTMLButtonElement).id;
         await jwtAxios.post(globals.urlVacations + "/fallow", {
            uuid,
            vacationId,
         });
      } catch (err) {
         notify.error(err);
      }
   };

   private unfallowAsync = async (args: SyntheticEvent) => {
      try {
         const uuid = store.getState().userState.user.uuid;
         const vacationId = (args.target as HTMLButtonElement).id;
         await jwtAxios.post(globals.urlVacations + "/unFallow", {
            uuid,
            vacationId,
         });
      } catch (err) {
         notify.error(err);
      }
   };

   public render(): JSX.Element {
      return (
         <div>
            <br />

            <svg xmlns='http://www.w3.org/2000/svg' style={{ display: "none" }}>
               <symbol id='geo-fill' viewBox='0 0 16 16'>
                  <path
                     fillRule='evenodd'
                     d='M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z'
                  />
               </symbol>
            </svg>

            <h1 className='visually-hidden'>Where would you fly today?</h1>
            <br />
            <br />
            <h2 className='pb-2 border-bottom'>Places to visit</h2>

            <br />
            <Container>
               <Row>
                  {this.state.vacations.map((v, index) => {
                     
                     return   <Col key={index}className='outerCard m-3' >
                              <Col className='innerCard'>
                                 <Row>
                                    <Col>
                                       <div
                                          className='feature-icon bg-primary bg-gradient'>
                                          <svg
                                             className='bi'
                                             width='1em'
                                             height='1em'>
                                             <use xlinkHref='#geo-fill' />
                                          </svg>
                                       </div>
                                    </Col>
                                 </Row>
                                 <VacationCard
                                    vacation={v}
                                   
                                 />
                                 <Row>
                                    <Col className='col-3 m-1'>
                                       <button
                                  
                                          id={v.vacationId.toLocaleString()}
                                          className='btn btn-info'
                                          onClick={this.fallowAsync}>
                                          Fallow
                                       </button>
                                    </Col>
                                    <Col className='col-3 m-1'>
                                       <button
                                    
                                          id={v.vacationId.toLocaleString()}
                                          className='btn btn-info'
                                          onClick={this.unfallowAsync}>
                                          Unfollow
                                       </button>
                                    </Col>
                                 </Row>
                              </Col>
                           </Col>
                      
                  
                  })}
               </Row>
            </Container>
            <div className='b-example-divider'></div>
         </div>
      );
   }
}

export default HomeUserPage;
