import { Form } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

import GeneralSignupInfo from '../components/GeneralSignupInfo';
import TutorSignupInfo from '../components/TutorSignupInfo';

const TutorSignup = () => {
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
        <TutorSignupInfo />
      </Box>
    </Form>
  );
};

export default TutorSignup;
