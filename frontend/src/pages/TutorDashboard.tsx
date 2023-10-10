import { roundButtonTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'
import Dashboard from '../components/Dashboard';

const DUMMY_TUTOR_INFO = {
  name: "James Smith",
  total_meeting_time: "16 h",
  avg_monthly_meeting_time: "8 h",
  avg_weekly_meeting_time: "2h",
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
}

function TutorDashboard() {
  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Button
            to='/new-appt'
            component={Link}
            className='my-8 py-3 px-24'
            sx={{
              backgroundColor: '#BE185D',
            }}>
            <Typography className="font-bold">
              Generate report
            </Typography>
          </Button>
        </ThemeProvider>
        <Dashboard {...DUMMY_TUTOR_INFO}/>
      </Box>
    </>
  )
}

export default TutorDashboard;
