import { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Unsubscribe } from "redux";
import VacationsModel from  "../../../Models/vacationModel";
import store from "../../../Redux/Store";
import {History} from "history"
import { downloadedVacations } from "../../../Redux/vacationsState";
import globals from "../../../Service/globals";
import jwtAxios from "../../../Service/JwtService";
import notify from "../../../Service/Notify";
import "./Reports.css";
import {  NavLink } from "react-router-dom";


interface ReportsProps {
    history: History ;
}

interface ReportsState {
  vacations?: VacationsModel[];
}

class Reports extends Component< ReportsProps, ReportsState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: ReportsProps ) {
    super(props);
    this.state = {
      vacations: store.getState().vacationState.vacation
    };
  }

  public async componentDidMount() {
    try {

      if(!store.getState().userState.user){
      this.props.history.push("/auth/sign-in") ;
      return
       };

      this.unsubscribeStore = store.subscribe(() => {
        this.setState({ vacations: store.getState().vacationState.vacation });
      });

      if (this.state.vacations.length === 0) {
        const response = await jwtAxios.get<VacationsModel[]>(
          globals.urlAdmin + "/"
        );
        store.dispatch(downloadedVacations(response.data));
       
      }
    } catch (err) {
      notify.error(err);
    }
  }


  public render(): JSX.Element {
    return (
      <div className="Reports">
        <NavLink className="btn btn-dark" to="/admin-home">Back to dashboard</NavLink>
       <div className="ReportsChart">
        <Bar
     
          type="Bar"
          data= {{
            labels:  this.state.vacations?.map( v => v.vacationName) ,
            datasets: [
              {
                label: "Likes",
                fill: true,
                lineTension: 1,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 1,
                data: this.state.vacations?.map( v => v.followers),
                 
              },
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Numbers of likes per vacation package",
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
        </div>
      </div>
    );
  }
}

export default Reports;
