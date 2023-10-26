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
  const data = await request.formData();
  const userInfo = Object.fromEntries(data);
  console.log(userInfo);
  // const response = await axios.post('/user/register?tutor=true', userInfo);
  // console.log(response);
  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     "status": response.status
  //   })
  // }
  return redirect('/signin');
};

export default TutorSignup;
