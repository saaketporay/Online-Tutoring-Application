import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal';
import {
  Form,
  useActionData,
  useOutletContext,
  json,
  redirect,
  ActionFunction,
  useSubmit
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleModal, clearAppointmentId } from "../features/modalSlice";
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#404040',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteAppointmentModal = () => {
  const handleModalClose = useOutletContext() as VoidFunction;
  const showModal = useAppSelector((state) => state.modal.showModal);

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-label="delete-appt-title"
        aria-describedby="delete-appt-description">
        <Box sx={modalStyle} className='flex'>
          <Form method="delete">
            <Stack direction={'column'} spacing={2}>
              <Typography id="delete-appt-title" variant="h5">
                Are you sure you want to cancel this appointment?
              </Typography>
              <Typography id="delete-appt-description">
                Click outside of this modal to exit
              </Typography>
              <Button
                type='submit'
                variant='contained'
                color='error'>
                Cancel appointment
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAppointmentModal;

export const deleteAppointmentAction: ActionFunction = async ({ request, params }) => {
  const data = await request.formData();
  const appointmentInfo = Object.fromEntries(data);
  console.log(appointmentInfo);
  console.log(params.apptId);
  return redirect("/dashboard");
  // const response = await axios.delete(`/appointment/:${appointmentId}`, appointmentInfo);
  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     "status": response.status
  //   });
  // }
  // const dispatch = useAppDispatch();
  // dispatch(clearAppointmentId());
  // return redirect("/dashboard");
};
