import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, Form, json, redirect, useActionData } from 'react-router-dom';
import type { ActionFunction, ActionFunctionArgs } from "react-router";
import { ThemeProvider } from '@emotion/react';
import { squareButtonTheme, checkboxTheme, textFieldTheme } from '../theme';
import { createTheme } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';

const theme = createTheme(textFieldTheme, checkboxTheme, squareButtonTheme);

interface authError {
  message?: string,
  errors: {
    email: string,
    password: string,
  }[]
}

function EmailSignin() {
  const data = useActionData() as authError;
  console.log(data)

  return (
    <>
      <Box className="grid justify-center bg-[#191919]">
        <Form className="grid" method="post">
          <Typography
            variant="h4"
            className="mt-24 mb-12 justify-self-center"
          >
            Sign in
          </Typography>
          {data && data.errors &&
            <>
              <ul className="mt-0">
                {Object.values(data.errors).map((error: Object) => {
                  return (
                    <li key={error.toString()}>
                      {error.toString()}
                    </li>
                  )
                })}
              </ul>
            </>
          }
          <ThemeProvider theme={theme}>
            <TextField
              required
              id="email"
              name="email"
              label="Required"
              placeholder="Email Address"
              autoComplete="off"
              className="w-[410px] mb-10"
            />
            <TextField
              required
              id="password"
              name="password"
              label="Required"
              placeholder="Password"
              type="password"
              className="w-[410px] mb-4"
            />
            <Button
              className="mt-8 py-2"
              type="submit"
            >
              SIGN IN
            </Button>
            <div className='flex justify-between'>
              <Link
                to="/password-reset"
                component={RouterLink}
                className="mt-2"
                color="#A3A3A3"
                fontSize={14}
              >
                Forgot Password?
              </Link>
              <Link
                to="/signup"
                component={RouterLink}
                className="mt-2"
                color="#A3A3A3"
                fontSize={14}
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </ThemeProvider>
        </Form >
      </Box>
    </>
  )
}

export default EmailSignin;

export const authAction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const userInfo = Object.fromEntries(data);
  const response = await axios.get('/');
  console.log(response);
  if (response.status != 200) {
    return response.data;
  }
  return redirect('/student')
  // throw json(null, { statusText: "Unexpected error came from server", status: 400 })
}
