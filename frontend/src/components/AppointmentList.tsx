import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteAppointmentIcon from '../assets/icons/Delete-Appointment-Icon.svg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal, setAppointmentId } from "../redux/modalSlice";

type appointmentsProps = {
  appointments: {
    student_name: string,
    tutor_name: string,
    course: string,
    day: string,
    time: string,
    appointment_id: string,
  }[],
}

const AppointmentList = ({ appointments }: appointmentsProps) => {
  const dispatch = useAppDispatch();
  const user_type = useAppSelector((state) => state.auth.user_type);

  return (
    <>
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
                      dispatch(setShowModal(true));
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
    </>
  )
};

export default AppointmentList;
