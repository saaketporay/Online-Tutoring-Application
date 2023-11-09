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
import axios from 'axios';
import { setExpiration, setToken } from '../redux/authSlice';
import GeneralSignupInfo, {
  signupError,
} from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';
import { AvailableCourseType } from '../components/TutorSignupInfo';
import store from '../redux/store';

const TutorSignup = () => {
  const subjects = useLoaderData();
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
  console.log('loader');
  const response = await axios.get(
    'http://localhost:3000/availability/subjects'
  );
  console.log('response:', response);
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
  const tutorInfo = Object.fromEntries(await request.formData());

  const errors = [];
  const { email, phone_number, password } = tutorInfo;
  if (!email.toString().includes('@')) {
    errors.push('Email address is invalid.');
  }
  if (isNaN(parseInt(phone_number.toString()))) {
    errors.push('Phone number can only contain numbers.');
  }
  if (password.toString().length < 9) {
    errors.push('Password must have at least 8 characters.');
  }
  if (password.toString().search(/`~!@#%&-=_,.<>;/)) {
    errors.push(
      'Password must contain one of the following special characters: `~!@#%&-=_,.<>;'
    );
  }
  if (errors) {
    return json({ errors: errors });
  }

  const courses = (
    JSON.parse(tutorInfo.courses as string) as { label: string }[]
  ).map(({ label }) => label);
  const schedule = (JSON.parse(tutorInfo.schedule as string) as string[]).map(
    (date) => new Date(date)
  );
  const modifiedTutorInfo = {
    ...tutorInfo,
    user_type: 'tutor',
    profile_picture: 'http://example.com/fatman.jpg', // TODO: implement file picker on the frontend
    courses, // TODO: accept in the backend
    schedule, // TODO: accept in the backend
  };
  console.log(modifiedTutorInfo);

  const response = await axios.post('/user/register', modifiedTutorInfo);
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
  expiration.setHours(expiration.getHours() + 24 * 7);
  store.dispatch(setExpiration(expiration.toISOString()));
  return redirect('/signin');
};

export default TutorSignup;
