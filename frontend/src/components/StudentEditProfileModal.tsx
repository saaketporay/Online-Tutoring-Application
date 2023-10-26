import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { ActionFunction, Form, useActionData, useLoaderData, useOutletContext, json, redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import axios from 'axios';

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


const StudentEditProfileModal = () => {
  const handleModalClose = useOutletContext() as VoidFunction;
  const showModal = useAppSelector((state) => state.modal.showModal);

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-label="edit-profile-title"
        aria-describedby="edit-profile-description"
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
  );
};

export default StudentEditProfileModal;

export const studentEditProfileAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const editProfileInfo = Object.fromEntries(data);
  console.log(editProfileInfo);
  const response = await axios.patch('/user/info', editProfileInfo);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status
    });
  }
  return redirect('/dashboard');
};
