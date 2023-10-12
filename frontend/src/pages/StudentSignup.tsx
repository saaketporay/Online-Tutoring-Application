import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { squareButtonTheme, checkboxTheme, textFieldTheme } from '../theme';
import { useState } from 'react';
import { createTheme } from '@mui/material';

const theme = createTheme(textFieldTheme, checkboxTheme, squareButtonTheme);

function StudentSignup() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [spamChecked, setSpamChecked] = useState<boolean>(false);

  const formSubmitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, spamChecked);
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Box className='grid justify-center bg-[#191919]'>
          <Typography
            variant='h4'
            className='mt-8 mb-10 justify-self-center'>
            Sign up
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              required
              id='first-name'
              name='first-name'
              label='Required'
              placeholder='First Name'
              autoComplete='off'
              className='w-[410px] mb-10'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id='last-name'
              name='last-name'
              label='Required'
              placeholder='Last Name'
              autoComplete='off'
              className='w-[410px] mb-10'
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              id='email'
              name='email'
              label='Required'
              placeholder='Email Address'
              autoComplete='off'
              className='w-[410px] mb-10'
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              id='password'
              name='password'
              label='Required'
              placeholder='Password'
              type='password'
              className='w-[410px] mb-4'
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id='spam'
                  onChange={(e) => setSpamChecked(e.target.checked)}
                />
              }
              label='I want to receive spam'
              className='justify-start'
            />
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
      </form>
    </>
  )
}

export default StudentSignup;
