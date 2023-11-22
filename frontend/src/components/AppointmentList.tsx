import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InfoIcon from '../assets/icons/Info-Icon.svg';
import DeleteIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal, setAppointmentId } from "../redux/modalSlice";
import { getReadableDateTime } from '../utils/datetime';
import { appointmentsType } from '../pages/UserDashboard';

const AppointmentList = ({ appointments }: {appointments: appointmentsType}) => {
  const dispatch = useAppDispatch();
  console.log(appointments)
  const user_type = useAppSelector((state) => state.auth.user_type);

  return (
    <>
      <CardContent>
        <Typography variant='h6' align='center' className='my-3'>
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
                  <Typography variant='body1' className='self-center mr-auto'>
                    {user_type == "student" ? `${appt.Tutor.User.first_name} ${appt.Tutor.User.last_name}` : 
                    `${appt.User.first_name} ${appt.User.last_name}`} {getReadableDateTime(appt.date_time, appt.duration)}
                  </Typography>
                  <Button
                    component={NavLink}
                    to={`delete-appt/${appt.appointment_id}`}
                    onClick={() => {
                      dispatch(setAppointmentId(appt.appointment_id));
                      dispatch(setShowModal(true));
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    <SvgIcon
                      viewBox='0 0 45 45'
                      sx={{
                        fontSize: 45
                      }}
                    >
                      <InfoIcon />
                    </SvgIcon>
                  </Button>
                  <Button
                    component={NavLink}
                    to={`delete-appt/${appt.appointment_id}`}
                    onClick={() => {
                      dispatch(setAppointmentId(appt.appointment_id));
                      dispatch(setShowModal(true));
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}
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
