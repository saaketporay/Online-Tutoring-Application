import { roundButtonTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'
import Dashboard from '../components/Dashboard';

const DUMMY_STUDENT_INFO = {
  name: "John Smith",
  total_meeting_time: "32 h",
  avg_monthly_meeting_time: "16 h",
  avg_weekly_meeting_time: "4h",
  appointments: [
    {
      student_name: "John Smith",
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm',
      id: '1'
    },
    {
      student_name: "John Smith",
      tutor_name: 'Maria Garcia',
      course: 'CS 2336',
      day: 'Thursday',
      time: '3 pm - 4 pm',
      id: '2'
    }
  ]
}

function StudentDashboard() {
  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Button
            to='/new-appt'
            component={Link}
            className='my-8 py-3 px-16'
            sx={{
              backgroundColor: '#B45309',
            }}>
            <Typography className="font-bold">
              Schedule appointment
            </Typography>
          </Button>
        </ThemeProvider>
        <Dashboard {...DUMMY_STUDENT_INFO} />
      </Box>
    </>
  )
}

export default StudentDashboard;
