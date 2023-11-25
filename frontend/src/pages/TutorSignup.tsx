import {
  Form,
  json,
  redirect,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
  useActionData,
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { axiosInstance } from '../utils/axios';
import { setExpiration, setToken, setUserType } from '../redux/authSlice';
import GeneralSignupInfo, {
  signupError,
} from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';
import { Subject, FormattedSubject } from '../components/TutorSignupInfo';
import { store } from '../redux/store';

const TutorSignup = () => {
  const subjects = useLoaderData() as Subject[];
  const data = useActionData() as signupError;

  return (
    <Form
      method='post'
      className='grid justify-center bg-[#191919]'
      encType='multipart/form-data'>
      <Typography
        variant='h4'
        className='mt-8 mb-10 justify-self-center'>
        Sign up
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
        <GeneralSignupInfo />
      </Box>
      <Box className='w-[500px] justify-self-center'>
        <TutorSignupInfo subjects={subjects} />
      </Box>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  const instance = axiosInstance();
  const response = await instance.get('/availability/subjects');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);
  return response.data as Subject[];
};

export const action: ActionFunction = async ({ request }) => {
  const tutorInfo = Object.fromEntries(await request.formData());

  console.log(tutorInfo);

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

  let instance = axiosInstance(true);
  let response = await instance.post('/upload/profile-picture', {
    profile_picture: tutorInfo.profile_picture,
  });
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  const subjects = (
    JSON.parse(tutorInfo.subjects as string) as FormattedSubject[]
  ).map(({ label, subject_id }) => ({ subject_name: label, subject_id }));

  const schedule = (JSON.parse(tutorInfo.schedule as string) as string[]).map(
    (date) => new Date(date)
  );

  const modifiedTutorInfo = {
    ...tutorInfo,
    user_type: 'tutor',
    profile_picture: response.data.filename,
    subjects,
    schedule,
    hourly_chunks: 60 / +tutorInfo.hourly_chunks,
  };
  console.log(modifiedTutorInfo);
  instance = axiosInstance();
  response = await instance.post('/user/register', modifiedTutorInfo);
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  const { token, user_type } = response.data;
  store.dispatch(setUserType(user_type));
  store.dispatch(setToken(token));
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  store.dispatch(setExpiration(expiration.toISOString()));
  return redirect('/dashboard');
};

export default TutorSignup;
