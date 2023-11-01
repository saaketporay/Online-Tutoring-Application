import { cardTheme, textFieldTheme } from '../utils/theme';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { createTheme } from '@mui/material';
import { useActionData, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleModal, setAppointmentId } from "../redux/modalSlice";

type userProps = {
  first_name: string,
  last_name: string,
  total_meeting_time: string,
  user_type: string,
  user_id: string,
  appointments: {
    student_name: string,
    tutor_name: string,
    course: string,
    day: string,
    time: string,
    id: string
  }[],
};

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

type modalResponse = {
  errors: boolean | string[]
};

const Dashboard = ({
  first_name,
  last_name,
  total_meeting_time,
  user_type,
  appointments,
}: userProps) => {
  const showModal = useAppSelector((state) => state.modal.showModal);
  console.log("From dashboard: ", showModal);
  const dispatch = useAppDispatch();

  const actionData = useActionData() as modalResponse;
  if (actionData?.errors == false) {
    // setEditProfileModal(false);
  }

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>
        <Stack direction={'row'} spacing={3}>
          <Card
            sx={{
              width: 250,
              height: 600
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
                      onClick={() => dispatch(toggleModal())}
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
              </Stack>
            </CardContent>
          </Card>
            <Card
              className='justify-self-stretch'
              sx={{
                width: 800,
                height: 600
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
                            onClick={() => {
                              dispatch(setAppointmentId(appt.id));
                              dispatch(toggleModal());
                            }}
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
      </ThemeProvider >
    </>
  );
};

export default Dashboard;
