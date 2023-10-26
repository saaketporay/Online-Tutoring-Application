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
    // TODO: standardize key names to either camelCase, snake_case, or kebab-case
    // TODO: fix string key names in Forms
    firstname: userInfo['first-name'],
    lastname: userInfo['last-name'],
    email: userInfo.email,
    password: userInfo.password,
    phoneNumber: userInfo['phone-number'], // TODO: accept in the backend
    user_type: 'tutor',
    aboutMe: userInfo['about-me'],
    profilePicture: 'http://example.com/fatman.jpg', // TODO: implement file picker on the frontend
    isCriminal: false, // TODO: remove from request and generate on backend instead
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
  return redirect('/signin');
};

export default TutorSignup;
