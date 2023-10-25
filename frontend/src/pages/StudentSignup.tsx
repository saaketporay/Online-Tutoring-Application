import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Form } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import GeneralSignupInfo from '../components/GeneralSignupInfo';
import { squareButtonTheme } from '../theme';
import { ThemeProvider } from '@emotion/react';

const StudentSignup = () => {
  return (
    <>
      <Form method="post">
        <Box className='grid justify-center bg-[#191919]'>
          <Typography
            variant='h4'
            className='mt-8 mb-10 justify-self-center'>
            Sign up
          </Typography>
          <GeneralSignupInfo />
          <ThemeProvider theme={squareButtonTheme}>
            <Button
              className='mt-4 py-2'
              type='submit'>
              SIGN UP
            </Button>
            <Link
              to='/signin'
              component={RouterLink}
              className='mt-2 justify-self-end'
              color='#A3A3A3'
              fontSize={14}>
              Already have an account? Sign in
            </Link>
          </ThemeProvider>
        </Box>
      </Form>
    </>
  )
}

export default StudentSignup;
