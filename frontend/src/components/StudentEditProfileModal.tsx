import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import GeneralSignupInfo from './GeneralSignupInfo';
import {
  ActionFunction,
  Form,
  // useActionData,
  // useLoaderData,
  useOutletContext,
  json,
  redirect,
} from 'react-router-dom';
import { modalStyle } from '../utils/theme';
import { useAppSelector } from '../redux/hooks';
import { axiosInstance } from '../utils/axios';

const StudentEditProfileModal = () => {
  const { handleCloseModal, userInfo } = useOutletContext() as any;
  const { user } = userInfo;
  const showModal = useAppSelector((state) => state.modal.showModal);

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => handleCloseModal()}
        aria-label='edit-profile-title'
        aria-describedby='edit-profile-description'>
        <Box sx={modalStyle}>
          <Form method='patch'>
            <Stack
              direction={'column'}
              spacing={3}>
              <Typography
                id='edit-profile-title'
                variant='h5'>
                Edit profile
              </Typography>
              <GeneralSignupInfo userData={user} />
              <Button
                type='submit'
                variant='contained'>
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
  editProfileInfo.user_type = 'student';
  console.log(editProfileInfo);
  const instance = axiosInstance();
  const response = await instance.patch('/user/edit', editProfileInfo);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  return redirect('/dashboard');
};
