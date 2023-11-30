import {
  Form,
  // json,
  redirect,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Subject } from '../components/TutorSignupInfo';
// import { axiosInstance } from '../utils/axios';

import GeneralSignupInfo from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';

const EditTutorProfile = () => {
  const data = useLoaderData() as Subject[];

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
        <GeneralSignupInfo userData={undefined}/>
      </Box>
      <Box className='w-[500px] justify-self-center'>
        <TutorSignupInfo subjects={data} />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  // TODO: extract user_id to use in req url
  // TODO: extract JWT from logged in user and send with request

  // const instance = axiosInstance();
  // const response = await instance.get('/user/:user_id');
  // if (response.status !== 200) {
  //   throw json({
  //     ...response.data,
  //     status: response.status,
  //   });
  // }
  // console.log(response);
  // return response.data as BACKEND_USER_DATA_FORMAT;

  return null;
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
