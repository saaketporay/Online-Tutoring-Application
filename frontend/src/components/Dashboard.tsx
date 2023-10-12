import { dashboardCardTheme, textFieldTheme } from '../theme';
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

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#404040',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface userProps {
  first_name: string,
  last_name: string,
  email: string,
  total_meeting_time: string,
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

const dashboardTheme = createTheme(dashboardCardTheme, textFieldTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '325px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#F4F4F4",
          },
        }
      }
    }
  }
});

function Dashboard({
  first_name,
  last_name,
  email,
  total_meeting_time,
  avg_monthly_meeting_time,
  avg_weekly_meeting_time,
  user_type,
  user_id,
  appointments
}: userProps) {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [deleteApptModal, setDeleteApptModal] = useState<boolean>(false);

  const handleEditProfileSubmission = () => {
    console.log(user_id, firstName, lastName, inputEmail, password)
  }

  const handleDeleteApptSubmission = (
    appt_id: string
  ) => {
    console.log(appt_id)
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
                <Button
                  className="my-6 px-16"
                  sx={{
                    backgroundColor: '#16653480',
                    textTransform: 'none',
                    color: '#4ADE80'
                  }}
                  onClick={() => setEditProfileModal(true)}>
                  Edit Profile
                </Button>
                <Modal
                  open={editProfileModal}
                  onClose={() => setEditProfileModal(false)}
                  aria-labeledby="edit-profile-title"
                  aria-describedby="edit-profile-description">
                  <Box sx={modalStyle}>
                    <form onSubmit={handleEditProfileSubmission}>
                      <Stack direction={'column'} spacing={2}>
                        <Typography id="edit-profile-title" variant="h5">
                          Edit profile
                        </Typography>
                        <TextField
                          required
                          value={first_name}
                          id="first-name"
                          name="first-name"
                          label="Required"
                          placeholder="First Name"
                          autoComplete="off"
                          className="w-[410px] mb-10"
                          onChange={e => setFirstName(e.target.value)} />
                        <TextField
                          required
                          value={last_name}
                          id="last-name"
                          name="last-name"
                          label="Required"
                          placeholder="Last Name"
                          autoComplete="off"
                          className="w-[410px] mb-10"
                          onChange={e => setLastName(e.target.value)} />
                        <TextField
                          required
                          value={email}
                          id="email"
                          name="email"
                          label="Required"
                          placeholder="Email Address"
                          autoComplete="off"
                          className="w-[410px] mb-10"
                          onChange={e => setInputEmail(e.target.value)} />
                        <TextField
                          required
                          id="password"
                          name="password"
                          label="Required"
                          placeholder="Password"
                          type="password"
                          className="w-[410px] mb-4"
                          onChange={e => setPassword(e.target.value)} />
                        <Button
                          onClick={handleEditProfileSubmission}
                          variant="contained">
                            Submit profile changes
                        </Button>
                      </Stack>
                    </form>
                  </Box>
                </Modal>
                <Typography variant='subtitle1' align='center'>
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
                  {appointments.map(function (appt, i) {
                    return (
                      <Stack direction={'row'} key={i} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='body1'>
                          {appt.course} {user_type == "student" ? appt.tutor_name : appt.student_name} {appt.day} {appt.time}
                        </Typography>
                        <div>
                          <Button
                            onClick={() => setDeleteApptModal(true)}
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
                          <Modal
                            open={deleteApptModal}
                            onClose={() => setDeleteApptModal(false)}
                            aria-labeledby="delete-appt-title"
                            aria-describedby="delete-appt-description">
                            <Box sx={modalStyle} className='flex'>
                              <form onSubmit={() => handleDeleteApptSubmission(appt.id)}>
                                <Stack direction={'column'} spacing={2}>
                                  <Typography id="delete-appt-title" variant="h5">
                                    Are you sure you want to cancel this appointment?
                                  </Typography>
                                  <Typography id="delete-appt-description">
                                    Click outside of this modal to exit
                                  </Typography>
                                  <Button
                                    type='submit'
                                    variant='contained'
                                    color='error'>
                                    Cancel appointment
                                  </Button>
                                </Stack>
                              </form>
                            </Box>
                          </Modal>
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
    </>
  )
}

export default Dashboard;
