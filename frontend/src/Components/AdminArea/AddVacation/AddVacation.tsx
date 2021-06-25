import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BrowserRouter, NavLink, useHistory } from "react-router-dom";
import VacationsModel from  "../../../Models/vacationModel";
import store from "../../../Redux/Store";
import globals from "../../../Service/globals";
import jwtAxios from "../../../Service/JwtService";
import notify from "../../../Service/Notify";
import "./AddVacation.css";

function AddVacation() {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const { handleSubmit, register, reset, formState } =
      useForm<VacationsModel>();

   const history = useHistory();

   useEffect(() => {
      if (!store.getState().userState.user) {
         history.push("/auth/sign-in");
         return;
      }
   });

   const resetValues = () => {
      if (formState.isSubmitSuccessful) {
         reset();
      }
   };

   const send = async (newVacation: VacationsModel) => {
      try {
         await jwtAxios.post<VacationsModel>(
            globals.urlAdmin + "/",
            VacationsModel.convertToFormDataAdd(newVacation)
         );
         notify.success("Success!");
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
               Add
            </NavLink>
         </BrowserRouter>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>New Vacation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form
                  id='addVacationForm'
                  key='addVacationForm'
                  onSubmit={handleSubmit(send)}
                  className='AddVacation'>
                  <Form.Group controlId='formVacationName'>
                     <Form.Label>Vacation Name:</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter vacation name...'
                        {...register("vacationName")}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId='destination'>
                     <Form.Label>Destination:</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter destination...'
                        {...register("destination")}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId='description'>
                     <Form.Label>Description:</Form.Label>
                     <Form.Control
                        as='textarea'
                        rows={4}
                        placeholder='description...'
                        {...register("description")}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId='startDate'>
                     <Form.Label>Start Date:</Form.Label>
                     <Form.Control
                        type='date'
                        {...register("startDate")}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId='endDate'>
                     <Form.Label>End Date:</Form.Label>
                     <Form.Control
                        type='date'
                        {...register("endDate")}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId='price'>
                     <Form.Label>Price:</Form.Label>
                     <Form.Control
                        type='number'
                        {...register("price")}
                        required
                     />
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
               </form>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default AddVacation;
