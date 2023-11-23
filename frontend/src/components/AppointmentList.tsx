import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import HollowStar from '../assets/icons/Hollow-Star.svg';
import Star from '../assets/icons/Star.svg';
import DeleteIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { NavLink, Form, ActionFunction, useSubmit, redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal, setAppointmentId } from "../redux/modalSlice";
import { getReadableDateTime } from '../utils/datetime';
import { appointmentsType, favoriteTutorsType } from '../pages/UserDashboard';
import { axiosInstance } from '../utils/axios';

const AppointmentList = (
  {
    appointments,
    favorite_tutors,
  }: {
    appointments: appointmentsType,
    favorite_tutors: favoriteTutorsType,
  }) => {
  const dispatch = useAppDispatch();
  const submit = useSubmit();
  const user_type = useAppSelector((state) => state.auth.user_type);
  // console.log(favorite_tutors)

  return (
    <>
      <CardContent>
        <Typography variant='h6' align='center' className='mb-3'>
          Upcoming Appointments
        </Typography>
        {appointments ?
          <Stack direction={'column'} spacing={1}>
            {appointments.sort((a, b) => a.date_time >= b.date_time ? 1 : -1).map(function (appt, i) {
              return (
                <Card
                  key={i}
                  className='flex bg-neutral-700 px-3 py-1 align-center'
                >
                  {user_type == 'student' &&
                    <>
                      <Avatar
                        variant='square'
                        sx={{
                          height: 50,
                          width: 50,
                        }}
                        className='my-auto mr-3'
                      />
                    </>
                  }
                  <Stack
                    direction={'column'}
                    className='my-auto mr-auto'
                  >
                    <Typography variant='body1'>
                      {user_type == "student" ? `${appt.Tutor.User.first_name} ${appt.Tutor.User.last_name}, ${appt.Tutor.User.email}` :
                        `${appt.User.first_name} ${appt.User.last_name}, ${appt.User.email}`}
                    </Typography>
                    <Typography variant='body1'>
                      {getReadableDateTime(appt.date_time, appt.duration)}
                    </Typography>
                  </Stack>
                  {user_type == 'student' &&
                    <>
                      {favorite_tutors && favorite_tutors.find((tutor) => tutor.Tutor.tutor_id == appt.Tutor.tutor_id) ?
                        <Form
                          method='DELETE'
                          action={`favorite/${appt.Tutor.tutor_id}`}
                        >
                          <Button
                            type='submit'
                            sx={{
                              "&:hover": {
                                backgroundColor: 'transparent'
                              }
                            }}
                            disableRipple
                          >
                            <SvgIcon
                              viewBox='0 0 45 45'
                              sx={{
                                fontSize: 45
                              }}
                            >
                              <Star />
                            </SvgIcon>
                          </Button>
                        </Form>
                        :
                        <Form
                          method='POST'
                          action={`favorite/${appt.Tutor.tutor_id}`}
                        >
                          <Button
                            type='submit'
                            sx={{
                              "&:hover": {
                                backgroundColor: 'transparent'
                              }
                            }}
                            disableRipple
                          >
                            <SvgIcon
                              viewBox='0 0 45 45'
                              sx={{
                                fontSize: 45
                              }}
                            >
                              <HollowStar />
                            </SvgIcon>
                          </Button>
                        </Form>
                      }
                    </>
                  }
                  <Button
                    component={NavLink}
                    to={`appt/delete/${appt.appointment_id}`}
                    onClick={() => {
                      dispatch(setAppointmentId(appt.appointment_id));
                      dispatch(setShowModal(true));
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}
                    disableRipple
                  >
                    <SvgIcon
                      viewBox='0 0 45 45'
                      sx={{
                        fontSize: 45
                      }}
                    >
                      <DeleteIcon />
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
    </>
  )
};

export default AppointmentList;
