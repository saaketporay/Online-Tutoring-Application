import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal';
import {
  Form,
  useOutletContext,
  json,
  redirect,
  ActionFunction,
} from 'react-router-dom';
import { modalStyle } from '../utils/theme';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAppointmentId } from "../redux/modalSlice";
import { axiosInstance } from '../utils/axios';
import { AxiosError } from 'axios';
import { store } from '../redux/store';

const DeleteAppointmentModal = () => {
  const { handleCloseModal } = useOutletContext() as any;
  const showModal = useAppSelector((state) => state.modal.showModal);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => {
          dispatch(clearAppointmentId());
          handleCloseModal();
        }}
        aria-label="delete-appt-title"
        aria-describedby="delete-appt-description"
      >
        <Box sx={modalStyle}>
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
                color='error'
              >
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

export const deleteAppointmentAction: ActionFunction = async ({ params }) => {
  store.dispatch(clearAppointmentId());
  const { apptId } = params
  try {
    const instance = axiosInstance();
    await instance.delete(`/appointments/delete/${apptId}`);
    return redirect("/dashboard");
  } catch (err) {
    if (err instanceof AxiosError) {
      throw json({
        message: err.response?.data,
        status: err.response?.status,
      });
    }
  }
};
