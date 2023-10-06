import {
  roundButtonTheme,
  dashboardCardTheme
} from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditAppointmentIcon from '../assets/icons/Edit-Appointment-Icon.svg';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';

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
                height: 500
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
                  <Typography variant='subtitle1' align='center'>
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
                    <Typography variant='body1' align='center'>
                      Total meeting time / course
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: 250,
                    height: 125
                  }}>
                  <CardContent>
                    <Typography variant='body1' align='center'>
                      Meeting time for last 30 days
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: 250,
                    height: 125
                  }}>
                  <CardContent>
                    <Typography variant='body1' align='center'>
                      Total meeting time / instructor
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
              <Card
                className='justify-self-stretch'
                sx={{
                  height: 350
                }}>
                <CardContent>
                  <Typography variant='h6' align='center' className='mb-3'>
                    Upcoming Appointments
                  </Typography>
                  <Stack direction={'column'}>
                    {DUMMY_STUDENT_INFO.appointments.map(function (appt, i) {
                      return (
                        <Stack direction={'row'} key={i} alignItems={'center'} justifyContent={'space-between'}>
                          <Typography variant='body1'>
                            {appt.course} {appt.tutor_name} {appt.day} {appt.time}
                          </Typography>
                          <div>
                            <Button>
                              <SvgIcon
                                viewBox='0 0 45 45'
                                sx={{
                                  fontSize: 35
                                }}>
                                <EditAppointmentIcon />
                              </SvgIcon>
                            </Button>
                            <Button>
                              <SvgIcon
                                viewBox='0 0 45 45'
                                sx={{
                                  fontSize: 35
                                }}>
                                <DeleteAppointmentIcon />
                              </SvgIcon>
                            </Button>
                          </div>
                        </ Stack>
                      )
                    })}
                  </Stack>
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
