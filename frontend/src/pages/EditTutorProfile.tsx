import {
  Form,
  json,
  redirect,
  useLoaderData,
  // useActionData,
  LoaderFunction,
  ActionFunction,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { axiosInstance } from '../utils/axios';
import GeneralSignupInfo, {
  // signupError,
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
  // const data = useActionData() as signupError;

  return (
    <Form
      method='post'
      className='grid justify-center bg-[#191919] py-20'>
      <Typography
        variant='h4'
        className='mb-16 justify-self-center'>
        Edit your profile
      </Typography>
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

  data.subjects = response.data as Subject[];

  instance = axiosInstance();
  response = await instance.get('/user/tutorInfo');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  data.tutorInfo = response.data as TutorInfo;

  data.userData = {
    first_name: data.tutorInfo.first_name,
    last_name: data.tutorInfo.last_name,
    email: data.tutorInfo.email,
  } as userType;

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const tutorInfo = Object.fromEntries(await request.formData());

  const errors = [];
  const { email, password } = tutorInfo;
  if (!email.toString().includes('@')) {
    errors.push('Email address is invalid.');
  }
  if (password.toString().length < 9) {
    errors.push('Password must have at least 8 characters.');
  }
  if (password.toString().search(/[`~!@#%&-=_,.<>;]/g) === -1) {
    errors.push(
      'Password must contain one of the following special characters: `~!@#%&-=_,.<>;'
    );
  }
  console.log('errors:', errors);
  if (errors.length > 0) {
    return json({ errors: errors });
  }

  // let instance = axiosInstance(true);
  // let response = await instance.post('/upload/profile-picture', {
  //   profile_picture: tutorInfo.profile_picture,
  // });

  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     status: response.status,
  //   });
  // }

  const subjects = (
    JSON.parse(tutorInfo.subjects as string) as FormattedSubject[]
  ).map(({ label, subject_id }) => ({ subject_name: label, subject_id }));

  const modifiedTutorInfo = {
    ...tutorInfo,
    user_type: 'tutor',
    // profile_picture: response.data.filename,
    subjects,
  };

  // instance = axiosInstance();
  // response = await instance.patch('/user/edit', modifiedTutorInfo);

  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     status: response.status,
  //   });
  // }

  return redirect('/dashboard');
};

export default EditTutorProfile;
