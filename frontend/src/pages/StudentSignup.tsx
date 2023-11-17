import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Form } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import GeneralSignupInfo from '../components/GeneralSignupInfo';
import { squareButtonTheme } from '../utils/theme';
import { ThemeProvider } from '@emotion/react';
import type { ActionFunction } from 'react-router-dom';
import { redirect, json } from 'react-router-dom';
import { store } from '../redux/store';
import { setToken, setExpiration, setUserType } from '../redux/authSlice';
import axios from 'axios';

const StudentSignup = () => {
  return (
    <>
      <Form method='post'>
        <Box className='grid justify-center bg-[#191919]'>
          <Typography
            variant='h4'
            className='mt-12 mb-6 justify-self-center'>
            Sign up
          </Typography>
          <GeneralSignupInfo />
          <ThemeProvider theme={squareButtonTheme}>
            <Button
              className='mt-4 py-2 px-44 place-self-center'
              type='submit'>
              SIGN UP
            </Button>
            <Link
              to='/signin'
              component={RouterLink}
              className='mt-2 place-self-center'
              color='#A3A3A3'
              fontSize={14}>
              Already have an account? Sign in
            </Link>
          </ThemeProvider>
        </Box>
      </Form>
    </>
  );
};

export default StudentSignup;

export const userSignupAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const studentInfo = Object.fromEntries(data);
  let errors = [];
  const { email, password } = studentInfo;
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
  if (errors.length > 0) {
    return json({ errors: errors });
  }
  console.log(studentInfo);
  const response = await axios.post('http://localhost:3000/user/register', {
    ...studentInfo,
    user_type: 'student',
  });
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  const { token, user_type } = response.data;
  store.dispatch(setUserType(user_type));
  axios.defaults.headers['Authorization'] = token;
  store.dispatch(setToken(token));
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24 * 7);
  store.dispatch(setExpiration(expiration.toISOString()));
  return redirect('/dashboard');
};
