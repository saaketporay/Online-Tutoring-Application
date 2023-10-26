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
  bgcolor: '#191919',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface editProfileModalProps {
  first_name: string,
  last_name: string,
  email: string,
  showEditProfileModal: boolean,
  onClose: () => void,
  formHandler: VoidFunction
}

const StudentEditProfileModal = () => {
  const loaderData = useLoaderData();
  let open = true

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          open = false;
        }}
      // aria-labeledby="edit-profile-title"
      // aria-describedby="edit-profile-description"
      >
        <Box sx={modalStyle}>
          <Form method="patch">
            <Stack direction={'column'} spacing={3}>
              <Typography id="edit-profile-title" variant="h5">
                Edit profile
              </Typography>
              <TextField
                required
                // value={first_name}
                variant="outlined"
                id="first-name"
                name="first-name"
                label="Required"
                placeholder="First Name"
                autoComplete="off"
                className="w-[410px] mb-10"
              // onChange={e => setFirstName(e.target.value)}
              />
              <TextField
                required
                // value={last_name}
                id="last-name"
                name="last-name"
                label="Required"
                placeholder="Last Name"
                autoComplete="off"
                className="w-[410px] mb-10"
              // onChange={e => setLastName(e.target.value)}
              />
              <TextField
                required
                // value={email}
                id="email"
                name="email"
                label="Required"
                placeholder="Email Address"
                autoComplete="off"
                className="w-[410px] mb-10"
              // onChange={e => setInputEmail(e.target.value)}
              />
              <TextField
                required
                id="password"
                name="password"
                label="Required"
                placeholder="Password"
                type="password"
                className="w-[410px] mb-4"
              // onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained">
                Submit profile changes
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </>
  )
}

export default StudentEditProfileModal;
