import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BrowserRouter, NavLink, useHistory } from "react-router-dom";
import VacationsModel from "../../../Models/vacationModel";
import store from "../../../Redux/Store";
import globals from "../../../Service/globals";
import jwtAxios from "../../../Service/JwtService";
import notify from "../../../Service/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const { handleSubmit, register, reset, formState } = useForm<VacationsModel>();

   const [vacationList, setVacationList] = useState<VacationsModel[]>([]);

   const history = useHistory();

   useEffect(() => {
      if (!store.getState().userState.user) {
         history.push("/auth/sign-in");
         return;
      }

      initList();
      store.subscribe(() => {
         const currentVacations = store.getState().vacationState.vacation;
         setVacationList(currentVacations);
      });
   });

   const resetValues = () => {
      if (formState.isSubmitSuccessful) {
         reset();
      }
   };

   const initList = async function vacationListInit() {
      try {
         const vacation = await store.getState().vacationState.vacation;
         setVacationList(vacation);
      } catch (err) {
         notify.error(err);
      }
   };

   const sendPatch = async (editedVacation: VacationsModel) => {
      try {
         const affectedVacation = await jwtAxios.patch(
            globals.urlAdmin + "/",
            VacationsModel.convertToFormDataPatch(editedVacation)
         );
         if (affectedVacation.data.affectedRows !== 0)
            notify.success("Successful edit.");
         resetValues();
         handleClose();
      } catch (err) {
         notify.error(err);
      }
   };

   return (
      <>
         <BrowserRouter>
            <NavLink
               to='/admin-home'
               onClick={handleShow}
               className='btn btn-dark'>
               Edit
            </NavLink>
         </BrowserRouter>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Editor Panel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  onSubmit={handleSubmit(sendPatch)}
                  className='EditVacation'>
                  <Form.Group controlId='formVacationId'>
                     <select
                        key='formVacationId'
                        {...register("vacationId")}
                        required>
                        {vacationList.map((v, index) => (
                           <option key={index} value={v.vacationId}>
                              {v.vacationName}
                           </option>
                        ))}
                     </select>
                  </Form.Group>
                  <Form.Group controlId='formVacationName'>
                     <Form.Label>Vacation Name:</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter vacation name...'
                        {...register("vacationName")}
                     />
                  </Form.Group>
                  <Form.Group controlId='destination'>
                     <Form.Label>Destination:</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter destination...'
                        {...register("destination")}
                     />
                  </Form.Group>
                  <Form.Group controlId='description'>
                     <Form.Label>Description:</Form.Label>
                     <Form.Control
                        as='textarea'
                        rows={4}
                        placeholder='description...'
                        {...register("description")}
                     />
                  </Form.Group>
                  <Form.Group controlId='startDate'>
                     <Form.Label>Start Date:</Form.Label>
                     <Form.Control type='date' {...register("startDate")} />
                  </Form.Group>
                  <Form.Group controlId='endDate'>
                     <Form.Label>End Date:</Form.Label>
                     <Form.Control type='date' {...register("endDate")} />
                  </Form.Group>
                  <Form.Group controlId='price'>
                     <Form.Label>Price:</Form.Label>
                     <Form.Control type='number' {...register("price")} />
                  </Form.Group>
                  <Form.Group controlId='image'>
                     <Form.Label>Image:</Form.Label>
                     <Form.Control
                        type='file'
                        accept='image/*'
                        {...register("image")}
                     />
                  </Form.Group>
                  <Button variant='primary' type='submit'>
                     Submit
                  </Button>
                  <span> </span>
                  <Button
                     variant='secondary'
                     type='button'
                     onClick={handleClose}>
                     Close
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default EditVacation;
