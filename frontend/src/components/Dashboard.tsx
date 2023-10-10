import { dashboardCardTheme } from '../theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditAppointmentIcon from '../assets/icons/Edit-Appointment-Icon.svg';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

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
  name: string,
  total_meeting_time: string,
  avg_monthly_meeting_time: string,
  avg_weekly_meeting_time: string,
  appointments: {
    student_name: string,
    tutor_name: string,
    course: string,
    day: string,
    time: string,
    id: string
  }[]
}

function Dashboard({
  name,
  total_meeting_time,
  avg_monthly_meeting_time,
  avg_weekly_meeting_time,
  appointments
}: userProps) {
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [editApptModal, setEditApptModal] = useState<boolean>(false);
  const [deleteApptModal, setDeleteApptModal] = useState<boolean>(false);

  return (
    <>
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
                  {name}
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
                  onClick={() => setOpenProfileModal(true)}>
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
                          {appt.course} {appt.tutor_name} {appt.day} {appt.time}
                        </Typography>
                        <div>
                          <Button
                            onClick={() => setEditApptModal(true)}>
                            <SvgIcon
                              viewBox='0 0 45 45'
                              sx={{
                                fontSize: 35
                              }}>
                              <EditAppointmentIcon />
                            </SvgIcon>
                          </Button>
                          <Modal
                            open={editApptModal}
                            onClose={() => setEditApptModal(false)}
                            aria-labeledby="edit-appt-title"
                            aria-describedby="edit-appt-description">
                            <Box sx={modalStyle}>
                              <Typography id="edit-appt-title">
                                Edit appointment
                              </Typography>
                            </Box>
                          </Modal>
                          <Button onClick={() => setDeleteApptModal(true)}>
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
    </>
  )
}

export default Dashboard;
