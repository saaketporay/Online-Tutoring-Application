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

const theme = createTheme(textFieldTheme, checkboxTheme, squareButtonTheme)

function EmailSignin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const formSubmitHandler = (
    e: React.FormEvent<EventTarget>
  ) => {
    e.preventDefault();
    console.log(email, password, rememberUser)
  }

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Box className="grid justify-center bg-[#191919]">
          <Typography
            variant="h4"
            className="mt-24 mb-16 justify-self-center">
            Sign in
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              required
              id="email"
              name="email"
              label="Required"
              placeholder="Email Address"
              autoComplete="off"
              className="w-[410px] mb-10"
              onChange={e => setEmail(e.target.value)} />
            <TextField
              required
              id="password"
              name="password"
              label="Required"
              placeholder="Password"
              type="password"
              className="w-[410px] mb-4"
              onChange={e => setPassword(e.target.value)} />
            <FormControlLabel
              control={<Checkbox id="remember" onChange={e => setRememberUser(e.target.checked)} />}
              label="Remember me"
              className="justify-start" />
            <Button
              className="mt-8 py-2"
              type="submit">
              SIGN IN
            </Button>
            <div className='flex justify-between'>
              <Link
                to="/password-reset"
                component={RouterLink}
                className="mt-2"
                color="#A3A3A3"
                fontSize={14}>
                Forgot Password?
              </Link>
              <Link
                to="/signup"
                component={RouterLink}
                className="mt-2"
                color="#A3A3A3"
                fontSize={14}>
                Don't have an account? Sign up
              </Link>
            </div>
          </ThemeProvider>
        </Box>
      </form >
    </>
  )
}

export default EmailSignin;