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
import { setExpiration, setToken } from '../redux/authSlice';
import GeneralSignupInfo from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';
import store from '../redux/store';

const TutorSignup = () => {
  const data = useLoaderData();

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
        <TutorSignupInfo availableCourses={data} />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  // const response = await axios.get('subject/subjects');
  // if (response.status !== 200) {
  //   throw json({
  //     ...response.data,
  //     status: response.status,
  //   });
  // }
  // console.log(response);
  // return response.data as { subject_id: number; subject_name: string }[];
  return null;
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
    first_name: userInfo['first_name'],
    last_name: userInfo['last_name'],
    email: userInfo.email,
    password: userInfo.password,
    phone_number: userInfo['phone_number'],
    user_type: 'tutor',
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
  const token = response.data.token;
  store.dispatch(setToken(token));
  axios.defaults.headers['Authorization'] = token;
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + (24 * 7));
  store.dispatch(setExpiration(expiration.toISOString()));
  return redirect('/signin');
};

export default TutorSignup;
