import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";
import { squareButtonTheme, textFieldTheme } from '../theme';
import { createTheme } from '@mui/material';
import { useEffect, useState } from "react";

const theme = createTheme(textFieldTheme, squareButtonTheme);

const GeneralSignupInfo = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    // TODO: Form validation
  }, [firstName, lastName, email, password, phoneNumber])

  return (
    <>
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
          id='phone-number'
          name='phone-number'
          label='Required'
          placeholder='Phone Number'
          type='tel'
          className='w-[410px] mb-10'
          onChange={(e) => setPhoneNumber(e.target.value)}
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
      </ThemeProvider>
    </>
  )
}

export default GeneralSignupInfo;
