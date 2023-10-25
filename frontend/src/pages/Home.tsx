import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { roundButtonTheme } from '../theme';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <Typography variant="h4" className="mt-36 mb-5">Welcome to Online Tutoring Scheduler!</Typography>
        <Typography variant="h6" className="mb-20">We help students and instructors connect with each other.</Typography>
        <Typography variant="h6" className="mb-16">To continue,</Typography>
        <Stack spacing={3} direction={'row'}>
          <ThemeProvider theme={roundButtonTheme}>
            <Button
              to="/signup/student"
              component={Link}
              sx={{
                backgroundColor: "#16A34A"
              }}
              className="px-9 py-2">
              Sign up as a student
            </Button>
            <div className="w-[72px] h-[1px] bg-[#F4F4F4] mt-6" />
            <Typography variant="h6" className="mt-2">or</Typography>
            <div className="w-[72px] h-[1px] bg-[#F4F4F4] mt-6" />
            <Button
              to="/signup/student"
              component={Link}
              sx={{
                backgroundColor: "#6D28D9"
              }}
              className="px-12 py-2">
              Sign up as a tutor
            </Button>
          </ThemeProvider>
        </Stack>
      </Box>
    </>
  )
}

export default Home;
