import {
  roundButtonTheme,
  dashboardCardTheme
} from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

const DUMMY_STUDENT_INFO = {
  name: "John Smith",
  total_meeting_time: "32 h",
  avg_monthly_meeting_time: "16 h",
  avg_weekly_meeting_time: "4h",
  appointments: [
    {
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm'
    },
    {
      tutor_name: 'Maria Garcia',
      course: 'CS 2336',
      day: 'Thursday',
      time: '3 pm - 4 pm'
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
            style={{
              backgroundColor: '#B45309',
            }}>
            <Typography className="font-bold px-2">
              Schedule appointment
            </Typography>
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={dashboardCardTheme}>
          <Stack direction={'row'} spacing={3}>
            <Card
              sx={{
                width: 250,
                height: 400
              }}>
              <CardContent>
                <Stack direction={'row'} spacing={3}>
                  <Avatar
                    variant='square'
                    sx={{
                      height: 75,
                      width: 75
                    }} />
                  <Typography variant='h6' className='self-center'>
                    {DUMMY_STUDENT_INFO['name']}
                  </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Button
                    className="my-6 px-16"
                    style={{
                      backgroundColor: '#16653480',
                      textTransform: 'none',
                      color: '#4ADE80'
                    }}>
                    Edit Profile
                  </Button>
                  <Typography variant='subtitle1' className='self-center'>
                    Overall Stats
                  </Typography>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='body2'>
                      Total meeting time
                    </Typography>
                    <Typography variant='body2'>
                      {DUMMY_STUDENT_INFO['total_meeting_time']}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='body2'>
                      Avg. monthly meeting time
                    </Typography>
                    <Typography variant='body2'>
                      {DUMMY_STUDENT_INFO['avg_monthly_meeting_time']}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='body2'>
                      Avg. weekly meeting time
                    </Typography>
                    <Typography variant='body2'>
                      {DUMMY_STUDENT_INFO['avg_weekly_meeting_time']}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            <Stack direction={'column'} spacing={3}>
              <Stack direction={'row'} spacing={3}>
                <Card
                  sx={{
                    width: 250,
                    height: 125
                  }}>
                  <CardContent>

                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: 250,
                    height: 125
                  }}>
                  <CardContent>

                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: 250,
                    height: 125
                  }}>
                  <CardContent>

                  </CardContent>
                </Card>
              </Stack>
              <Card
                className='justify-self-stretch'
                sx={{
                  height: 250
                }}>
                <CardContent>

                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </ThemeProvider>
      </Box>
    </>
  )
};

export default StudentDashboard;
