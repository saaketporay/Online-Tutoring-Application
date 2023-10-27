import {
  Form,
  json,
  redirect,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

import GeneralSignupInfo from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';
import { AvailableCourseType } from '../components/TutorSignupInfo';

const TutorSignup = () => {
  const data = useLoaderData() as AvailableCourseType[];

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
        <TutorSignupInfo subjects={data} />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  const response = await axios.get('availability/subjects');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);
  return response.data as AvailableCourseType[];
};

export const action: ActionFunction = async ({ request }) => {
  const userInfo = Object.fromEntries(await request.formData());
  const courses = (
    JSON.parse(userInfo.courses as string) as { label: string }[]
  ).map(({ label }) => label);
  const schedule = (JSON.parse(userInfo.schedule as string) as string[]).map(
    (date) => new Date(date)
  );
  const modifiedUserInfo = {
    // TODO: fix string key names in Forms
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: userInfo.email,
    password: userInfo.password,
    phone_number: userInfo.phone_number, // TODO: accept in the backend
    user_type: 'student', // change to tutor
    about_me: userInfo['about-me'],
    profile_picture: 'http://example.com/fatman.jpg', // TODO: implement file picker on the frontend
    is_criminal: false, // TODO: remove from request and generate on backend instead
    courses, // TODO: accept in the backend
    schedule, // TODO: accept in the backend
  };
  console.log(modifiedUserInfo);

  const response = await axios.post('/user/register', modifiedUserInfo);
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  const token = (response.data as { token: string }).token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24 * 7);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('user_type', 'student');

  return redirect('/dashboard');
};

export default TutorSignup;
