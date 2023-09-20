import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import SvgIcon from '@mui/material/SvgIcon';
import EmailIcon from '../assets/icons/Email.svg';
import GoogleIcon from '../assets/icons/Google-Icon.svg';
import FacebookIcon from '../assets/icons/Facebook-Icon.svg';
import AppleIcon from '../assets/icons/Apple-Icon.svg';
import EllipseIcon from '../assets/icons/Ellipse-Icon.svg'
import { Link } from 'react-router-dom'
import { roundButtonTheme } from '../theme';

function GeneralSignin({ userType }: { userType?: string }) {
  return (
    <>
      <Box className="grid place-content-center bg-[#191919]">
        <Typography variant="h4" className="my-16">Sign in to Tutoring Scheduler</Typography>
        <Stack spacing={3}>
          <ThemeProvider theme={roundButtonTheme}>
            <Button to="/signin/email" component={Link} sx={{ backgroundColor: '#10B981', ":hover": { backgroundColor: '#10B981'}}}>
              <SvgIcon viewBox='0 0 41 41'>
                <EmailIcon />
              </SvgIcon>
              Sign in with Email
            </Button>
            <Button sx={{ backgroundColor: '#3B82F6', ":hover": { backgroundColor: '#3B82F6' }}}>
              <SvgIcon viewBox='0 0 31 31'>
                <EllipseIcon />
                <GoogleIcon />
              </SvgIcon>
              Sign in with Google
            </Button>
            <Button sx={{ backgroundColor: '#0284C7', ":hover": { backgroundColor: '#0284C7' } }}>
              <SvgIcon viewBox='0 0 40 40'>
                <FacebookIcon />
              </SvgIcon>
              Sign in with Facebook
            </Button>
            <Button sx={{ backgroundColor: '#F5F5F5', ":hover": { backgroundColor: '#F5F5F5' } }} className="text-[#191919]">
              <SvgIcon viewBox='0 0 44 44'>
                <AppleIcon />
              </SvgIcon>
              Sign in with Apple
            </Button>
          </ThemeProvider>
        </Stack>
      </Box>
    </>
  );
}

export default GeneralSignin;
