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
import { useActionData, NavLink } from 'react-router-dom';
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
    appointment_id: string,
  }[],
  favorite_tutors: {
    tutor_name: string,
    tutor_id: string,
  }[] | undefined,
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
  favorite_tutors,
}: userProps) => {
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
                      component={NavLink}
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
                <Stack direction={'row'} justifyContent={'space-between'} className="mt-5">
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
            }}
          >
            <Typography variant='h6' align='center' className='mt-6'>
              Favorite Tutors
            </Typography>
            {favorite_tutors ?
              <CardContent>
                <div className='flex flex-wrap gap-x-4 gap-y-4 justify-around'>
                  {favorite_tutors.map(function (tutor, i) {
                    return (
                      <Card 
                        key={i}
                        className='shadow-lg bg-neutral-700'
                      >
                        <NavLink
                          to={`favorite/${tutor.tutor_id}`}
                          onClick={() => dispatch(toggleModal())}
                          className='no-underline text-white'
                        >
                          <CardContent className='break-normal'>
                            {tutor.tutor_name}
                          </CardContent>
                        </NavLink>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            :
              <Typography variant='body1' align='center'>
                You have not selected any tutors as favorites yet.
              </Typography>
            }
            <CardContent>
              <Typography variant='h6' align='center' className='mb-3'>
                Upcoming Appointments
              </Typography>
              {appointments ? 
                <Stack direction={'column'} spacing={1}>
                  {appointments.map(function (appt, i) {
                    return (
                      <Card
                        key={i}
                        className='flex bg-neutral-700 px-3 py-1 justify-between align-center'
                      >
                        <Typography variant='body1' className='self-center'>
                          {appt.course} {user_type == "student" ? appt.tutor_name : appt.student_name} {appt.day} {appt.time}
                        </Typography>
                        <Button
                          component={NavLink}
                          to={`delete-appt/${appt.appointment_id}`}
                          onClick={() => {
                            dispatch(setAppointmentId(appt.appointment_id));
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
                              fontSize: 30
                            }}>
                            <DeleteAppointmentIcon />
                          </SvgIcon>
                        </Button>
                      </Card>
                    )
                  })}
                </Stack>
              : 
                <Typography variant='body1' align='center'>
                  You have no scheduled appointments at this time.
                </Typography>
              }
            </CardContent>
          </Card>
        </Stack>
      </ThemeProvider >
    </>
  );
};

export default Dashboard;
