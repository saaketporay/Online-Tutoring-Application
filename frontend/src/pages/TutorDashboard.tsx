import { roundButtonTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';
import Dashboard from '../components/Dashboard';
import { Link as RouterLink } from 'react-router-dom';

const DUMMY_TUTOR_INFO = {
  first_name: "James",
  last_name: "Smith",
  email: "jamesmith@outlook.com",
  total_meeting_time: "16 h",
  avg_meeting_time_per_course: "1 h",
  avg_meeting_time_per_user: "2 h",
  monthly_meeting_time: "9 h",
  avg_monthly_meeting_time: "8 h",
  avg_weekly_meeting_time: "2h",
  user_type: "tutor",
  user_id: "asdf",
  appointments: [
    {
      student_name: "John Smith",
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm',
      id: '1'
    },
  ]
};

function TutorDashboard() {

  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Button
            className='my-8 py-3 px-28'
            sx={{
              backgroundColor: '#BE185D',
              "&:hover": {
                backgroundColor: '#BE185D'
              }
            }}
          >
            <Link
              to="/edit-schedule"
              component={RouterLink}
              className="no-underline"
              color="#F4F4F4"
            >
              <Typography className="font-bold">
                Edit Profile
              </Typography>
            </Link>
          </Button>
        </ThemeProvider>
        <Dashboard {...DUMMY_TUTOR_INFO} />
      </Box>
    </>
  );
};

export default TutorDashboard;
