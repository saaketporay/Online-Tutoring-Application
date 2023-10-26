import { cardTheme, textFieldTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, createTheme } from '@mui/material';
import { Form, useActionData, Link } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#191919',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface userProps {
  first_name: string,
  last_name: string,
  email: string,
  monthly_meeting_time: string,
  total_meeting_time: string,
  avg_meeting_time_per_course: string,
  avg_meeting_time_per_user: string,
  avg_monthly_meeting_time: string,
  avg_weekly_meeting_time: string,
  user_type: string,
  user_id: string,
  appointments: {
    student_name: string,
    tutor_name: string,
    course: string,
    day: string,
    time: string,
    id: string
  }[]
}

const dashboardTheme = createTheme(cardTheme, textFieldTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '325px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#404040",
          },
        }
      }
    }
  }
});

interface modalResponse {
  errors: boolean | string[]
};

const Dashboard = ({
  first_name,
  last_name,
  email,
  total_meeting_time,
  avg_meeting_time_per_course,
  avg_meeting_time_per_user,
  monthly_meeting_time,
  avg_monthly_meeting_time,
  avg_weekly_meeting_time,
  user_type,
  user_id,
  appointments
}: userProps) => {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  
  const [deleteApptModal, setDeleteApptModal] = useState<boolean>(false);

  const actionData = useActionData() as modalResponse;
  if (actionData?.errors == false) {
    setEditProfileModal(false);
  }

  const editProfileSubmissionHandler = () => {
    
  }

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>
        <Stack direction={'row'} spacing={3}>
          <Card
            sx={{
              width: 250,
              height: 500
            }}>
            <CardContent>
              <Stack
                direction={'row'}
                spacing={3}
                className={user_type == "student" ? "grid" : ""}>
                {user_type == "tutor" &&
                  <Avatar
                    variant='square'
                    sx={{
                      height: 75,
                      width: 75
                    }} />
                }
                <Typography
                  variant='h6'
                  className={user_type == "student" ? "mt-2 justify-self-center" : "self-center"}>
                  {first_name} {last_name}
                </Typography>
              </Stack>
              <Stack direction={'column'} spacing={1}>
                {user_type == "student" &&
                  <>
                    <Button
                      className="mt-6 px-16"
                      component={Link}
                      to="edit-profile"
                      sx={{
                        backgroundColor: '#16653480',
                        textTransform: 'none',
                        color: '#4ADE80'
                      }}
                    >
                      Edit Profile
                    </Button>
                  </>
                }
                <Typography variant='subtitle1' align='center' className="mt-5">
                  Overall Stats
                </Typography>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography variant='body2'>
                    Total meeting time
                  </Typography>
                  <Typography variant='body2'>
                    {total_meeting_time}
                  </Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography variant='body2'>
                    Avg. monthly meeting time
                  </Typography>
                  <Typography variant='body2'>
                    {avg_monthly_meeting_time}
                  </Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography variant='body2'>
                    Avg. weekly meeting time
                  </Typography>
                  <Typography variant='body2'>
                    {avg_weekly_meeting_time}
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
                    Avg. meeting time / course
                  </Typography>
                  <Typography variant='h6' align='center' className='pt-4'>
                    {avg_meeting_time_per_course}
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
                  <Typography variant='h6' align='center' className='pt-4'>
                    {monthly_meeting_time}
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
                    Avg. meeting time / {user_type == 'student' ? 'Instructor' : 'Student'}
                  </Typography>
                  <Typography variant='h6' align='center' className='pt-4'>
                    {avg_meeting_time_per_user}
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
                  {appointments.map(function (appt, i) {
                    return (
                      <Stack direction={'row'} key={i} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='body1'>
                          {appt.course} {user_type == "student" ? appt.tutor_name : appt.student_name} {appt.day} {appt.time}
                        </Typography>
                        <div>
                          <Button
                            component={Link}
                            to={`delete-appt/${appt.id}`}
                            sx={{
                              "&:hover": {
                                backgroundColor: 'transparent'
                              }
                            }}>
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
      </ThemeProvider >
    </>
  )
}

export default Dashboard;
