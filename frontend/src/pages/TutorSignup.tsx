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
import {
  setEmail,
  setExpiration,
  setToken,
  setUserType,
} from '../redux/authSlice';
import GeneralSignupInfo, {
  signupError,
} from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';
import { Subject, FormattedSubject } from '../components/TutorSignupInfo';
import { store } from '../redux/store';
import React, { useState } from 'react';
import MultifactorAuth from '../components/MultifactorAuth';
import { useAppSelector } from '../redux/hooks';
import { setShowModal } from '../redux/modalSlice';

const TutorSignup = () => {
  const subjects = useLoaderData() as Subject[];
  const data = useActionData() as signupError;
  const showTOTPModal = useAppSelector((state) => state.modal.showModal);
  const userEmail = useAppSelector((state) => state.auth.email);

  return (
    <>
      {!showTOTPModal && (
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
            <ul className='mt-0'>
              {data.errors.map((error, i) => (
                <li
                  key={i}
                  className='text-red-500'>
                  {error}
                </li>
              ))}
            </ul>
          )}
          <Box className='w-[410px] justify-self-center'>
            <GeneralSignupInfo />
          </Box>
          <Box className='w-[500px] justify-self-center'>
            <TutorSignupInfo subjects={subjects} />
          </Box>
        </Form>
      )}
      {showTOTPModal && <MultifactorAuth email={userEmail} />}
    </>
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

  return response.data as Subject[];
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

  if (errors.length > 0) {
    return json({ errors: errors });
  }

  let instance = axiosInstance(true);
  let response = await instance.post('/upload/profile-picture', {
    profile_picture: tutorInfo.profile_picture,
  });

  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  const subjects = (
    JSON.parse(tutorInfo.subjects as string) as FormattedSubject[]
  ).map(({ label, subject_id }) => ({ subject_name: label, subject_id }));

  const modifiedTutorInfo = {
    ...tutorInfo,
    user_type: 'tutor',
    profile_picture: response.data.filename,
    subjects,
    hourly_chunks: 60 / +tutorInfo.hourly_chunks,
  };

  instance = axiosInstance();
  response = await instance.post('/user/register', modifiedTutorInfo);

  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  store.dispatch(setEmail(email as string));
  store.dispatch(setShowModal(true));

  return json({ status: 'Registration Successful' });
};

export default TutorSignup;
