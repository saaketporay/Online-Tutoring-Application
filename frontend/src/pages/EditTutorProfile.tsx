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
  TutorInfo,
} from '../components/TutorSignupInfo';
import { userType } from './UserDashboard';

const EditTutorProfile = () => {
  const { subjects, userData, tutorInfo } = useLoaderData() as {
    subjects: Subject[];
    userData: userType;
    tutorInfo: TutorInfo;
  };
  const data = useActionData() as signupError;

  return (
    <Form
      method='post'
      className='grid justify-center bg-[#191919] py-20'>
      <Typography
        variant='h4'
        className='mb-16 justify-self-center'>
        Edit your profile
      </Typography>
      {data && data.errors && (
        <>
          <ul className='mt-0'>
            {data.errors.map((error, i) => {
              return (
                <li
                  key={i}
                  className='text-red-500'>
                  {error}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Box className='w-[410px] justify-self-center'>
        <GeneralSignupInfo userData={userData} />
      </Box>
      <Box className='w-[500px] justify-self-center'>
        <TutorSignupInfo
          subjects={subjects}
          tutorInfo={tutorInfo}
        />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  const data: Partial<{
    subjects: Subject[];
    tutorInfo: TutorInfo;
    userData: userType;
  }> = {};

  let instance = axiosInstance();
  let response = await instance.get('/availability/subjects');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);

  data.subjects = response.data as Subject[];

  instance = axiosInstance();
  response = await instance.get('/user/tutorInfo');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);

  data.tutorInfo = response.data as TutorInfo;

  data.userData = {
    first_name: data.tutorInfo.first_name,
    last_name: data.tutorInfo.last_name,
    email: data.tutorInfo.email,
  } as userType;

  console.log(data);
  return data;
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

  return redirect('/dashboard');
};

export default EditTutorProfile;
