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
import GeneralSignupInfo from '../components/GeneralSignupInfo'; // signupError,
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
      className='grid justify-center bg-[#191919] py-20'
      encType='multipart/form-data'>
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

  response.data.schedule = response.data.schedule.map(
    (timeslot) => new Date(timeslot)
  );

  response.data.sunday = new Date(response.data.sunday);

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

  let instance;
  let response;

  // if (tutorInfo.profile_picture) {
  //   instance = axiosInstance(true);
  //   response = await instance.post('/upload/profile-picture', {
  //     profile_picture: tutorInfo.profile_picture,
  //   });

  //   if (response.status != 200) {
  //     throw json({
  //       ...response.data,
  //       status: response.status,
  //     });
  //   }
  // }

  const schedule = JSON.parse(tutorInfo.schedule as string) as Date[];

  const subjects = (
    JSON.parse(tutorInfo.subjects as string) as FormattedSubject[]
  ).map(({ label, subject_id }) => ({ subject_name: label, subject_id }));

  const modifiedTutorInfo = {
    ...tutorInfo,
    user_type: 'tutor',
    profile_picture: response ? (response.data.filename as string) : null,
    subjects,
    schedule,
  };

  instance = axiosInstance();
  response = await instance.patch('/user/edit', modifiedTutorInfo);

  if (response.status != 200) {
    return json({
      ...response.data,
      status: response.status,
    });
  }

  return redirect('/dashboard');
};

export default EditTutorProfile;
