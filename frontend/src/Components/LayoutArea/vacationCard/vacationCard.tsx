import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import VacationsModel from "../../../Models/vacationModel";
 
import globals from "../../../Service/globals";
import "./vacationCard.css";

interface VacationCardProps {
   vacation: VacationsModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

 
    
   let imageSrc = globals.urlVacations + "/images/" + props.vacation.image ;
   let imageHash = Date.now() ;


    useEffect(() =>{
       
         imageSrc = globals.urlVacations + "/images/" + props.vacation.image ;
         imageHash = Date.now() 
    
    },[props.vacation]);


   return (
      <div >
         <Row >
            <Col  className='col-12'>
               <h2 >{props.vacation.vacationName} </h2>
               {props.vacation.currentUserFallow ? (
                  <span>Fallowing</span>
               ) : null}
            </Col>
            <Col  className='col-12'>
               <h4 >{props.vacation.destination}</h4>
            </Col>
            <Col className='col-12' >{props.vacation.description}</Col>
            <Col className='col-12'>
               <p > Start In: {props.vacation.startDate}</p>
            </Col>
            <Col  className='col-12'>
               <p >End In: {props.vacation.endDate}</p>
            </Col>
            <Col  className='col-12'>
               <p >Price: {props.vacation.price}</p>
            </Col>
            <br />
            <Col className='col-12'  >Followers: {props.vacation.followers}</Col>
            <img 
               src={`${imageSrc}?${imageHash}`}
               alt={"vacation_" + props.vacation.vacationName}
               className='cardImg'
            />
         </Row>
      </div>
   );
}

export default VacationCard;
