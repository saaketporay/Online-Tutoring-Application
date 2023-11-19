import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";
import { squareButtonTheme, textFieldTheme } from '../utils/theme';
import { createTheme } from '@mui/material';
import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

const theme = createTheme(textFieldTheme, squareButtonTheme);

export type signupError = {
  errors: string[],
};

const GeneralSignupInfo = () => {
  const data = useActionData() as signupError;

  return (
    <>
      <ThemeProvider theme={theme}>
        {data && data.errors && 
          <>
            <ul className='mt-0'>
              {data.errors.map((error, i) => {
                return (
                  <li key={i} className='text-red-500'>
                    {error}
                  </li>
                )
              })}
            </ul>
          </>
        }
        <TextField
          required
          id='first_name'
          name='first_name'
          label='Required'
          placeholder='First Name'
          autoComplete='off'
          className='w-[410px] mb-10 justify-self-center'
        />
        <TextField
          required
          id='last_name'
          name='last_name'
          label='Required'
          placeholder='Last Name'
          autoComplete='off'
          className='w-[410px] mb-10 justify-self-center'
        />
        <TextField
          required
          id='email'
          name='email'
          label='Required'
          placeholder='Email Address'
          autoComplete='off'
          className='w-[410px] mb-10 justify-self-center'
        />
        <TextField
          required
          id='password'
          name='password'
          label='Required'
          placeholder='Password'
          type='password'
          className='w-[410px] mb-4 justify-self-center'
        />
      </ThemeProvider>
    </>
  )
}

export default GeneralSignupInfo;
