import { cardTheme, textFieldTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, createTheme } from '@mui/material';
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';

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
  
  return (
    <>
      <Modal
        open={true}
        // onClose={() => setDeleteApptModal(false)}
        aria-labeledby="delete-appt-title"
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
  )
}

export default DeleteAppointmentModal;
