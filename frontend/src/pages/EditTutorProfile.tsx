import {
  Form,
  json,
  redirect,
  useLoaderData,
  useActionData,
  LoaderFunction,
  ActionFunction,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { axiosInstance } from '../utils/axios';
import GeneralSignupInfo, {
  signupError,
} from '../components/GeneralSignupInfo';
import TutorSignupInfo, {
  Subject,
  FormattedSubject,
} from '../components/TutorSignupInfo';
import { userType } from './UserDashboard';

const EditTutorProfile = () => {
  const subjects = useLoaderData() as Subject[];
  const data = useActionData() as signupError;

  return (
    <Form
      method='post'
      className='grid justify-center bg-[#191919]'>
      <Typography
        variant='h4'
        className='mt-8 mb-10 justify-self-center'>
        Sign up
      </Typography>
      <Box className='w-[410px] justify-self-center'>
        <GeneralSignupInfo />
      </Box>
      <Box className='w-[500px] justify-self-center'>
        <TutorSignupInfo subjects={subjects} />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  // TODO: extract JWT from logged in user and send with request

  const data = {};

  let instance = axiosInstance();
  let response = await instance.get('/availability/subjects');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);

  data.subjects = response.data;

  instance = axiosInstance();
  response = await instance.get('/user/getTutorInfo');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);

  data.userInfo = response.data;

  return response.data as { subjects: Subject[]; userInfo: userType };
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const userInfo = Object.fromEntries(data);
  console.log(userInfo);
  // TODO: parse JSON.stringified courses and schedule and change them into the proper format

  // TODO: extract JWT from logged in user and send with request
  // TODO: extract user_id to use in req url

  // const instance = axiosInstance();
  // const response = await instance.post('/user/edit?tutor=true', userInfo);
  // console.log(response);
  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     "status": response.status
  //   })
  // }

  // TODO: extract tutor id and redirect to the right dashboard
  return redirect('/dashboard/tutor');
};

export default EditTutorProfile;
