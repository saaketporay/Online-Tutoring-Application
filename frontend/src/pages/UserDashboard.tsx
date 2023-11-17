import { cardTheme, roundButtonTheme, textFieldTheme } from '../utils/theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { ThemeProvider } from '@emotion/react';
import {
  Link as RouterLink,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigate,
  json,
} from 'react-router-dom';
import { createTheme } from '@mui/material';
import FavoriteTutorList from '../components/FavoriteTutorList';
import AppointmentList from '../components/AppointmentList';
import UserInfo from '../components/UserCardContent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal } from "../redux/modalSlice";
import { axiosInstance } from '../utils/axios';

const DUMMY_STUDENT_INFO = {
  first_name: "John",
  last_name: "Smith",
  email: "johnsmith@gmail.com",
  total_meeting_time: "32 h",
  user_type: "student",
  user_id: "qwer",
  appointments: [
    {
      student_name: "John Smith",
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm',
      appointment_id: '1',
    },
    {
      student_name: "John Smith",
      tutor_name: 'Maria Garcia',
      course: 'CS 2336',
      day: 'Thursday',
      time: '3 pm - 4 pm',
      appointment_id: '2',
    },
  ],
  favorite_tutors: [
    {
      tutor_name: "James Smith",
      tutor_id: '1',
    },
    {
      tutor_name: "Maria Garcia",
      tutor_id: '2',
    },
    {
      tutor_name: "Anurag Nagar",
      tutor_id: '3',
    },
    {
      tutor_name: "John Cole",
      tutor_id: '4',
    },
    {
      tutor_name: "Deepak Kumar",
      tutor_id: '5',
    },
    {
      tutor_name: "James Wilson",
      tutor_id: '6',
    },
    {
      tutor_name: "James Franco",
      tutor_id: '7',
    },
    {
      tutor_name: "Vince Gilligan",
      tutor_id: '8',
    },
    {
      tutor_name: "Johnathan Carpenter",
      tutor_id: '9',
    },
  ],
};

const DUMMY_TUTOR_INFO = {
  first_name: "James",
  last_name: "Smith",
  email: "jamesmith@outlook.com",
  total_meeting_time: "16 h",
  user_type: "tutor",
  user_id: "asdf",
  appointments: [
    {
      student_name: "John Smith",
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm',
      id: '1'
    },
  ],
};

const theme = createTheme(cardTheme, textFieldTheme, {
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

type userProps = {
  first_name: string,
  last_name: string,
  total_meeting_time: string,
  user_type: string,
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

const UserDashboard = () => {
  const userInfo = useLoaderData() as userProps;
  const dispatch = useAppDispatch();
  const user_type = useAppSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    navigate('/dashboard');
  };

  const {
    first_name,
    last_name,
    total_meeting_time,
    appointments,
    favorite_tutors,
  } = DUMMY_STUDENT_INFO;

  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Outlet context={handleCloseModal} />
          {user_type != "tutor" ?
            <Button
              to='/new-appt'
              component={RouterLink}
              className='my-8 py-3 px-16'
              sx={{
                backgroundColor: '#B45309',
                "&:hover": {
                  backgroundColor: '#B45309'
                }
              }}
            >
              <Typography className="font-bold">
                Schedule appointment
              </Typography>
            </Button>
            :
            <Button
              className='my-8 py-3 px-28'
              sx={{
                backgroundColor: '#BE185D',
                "&:hover": {
                  backgroundColor: '#BE185D'
                }
              }}
            >
              <Link
                to="/edit-tutor-profile"
                component={RouterLink}
                className="no-underline"
                color="#F4F4F4"
              >
                <Typography className="font-bold">
                  Edit Profile
                </Typography>
              </Link>
            </Button>
          }
          </ThemeProvider>
          <ThemeProvider theme={theme}>
          <Stack direction={'row'} spacing={3}>
            <Card
              sx={{
                width: 250,
                height: 600
              }}
            >
              <UserInfo
                first_name={first_name}
                last_name={last_name}
                total_meeting_time={total_meeting_time}
              />
            </Card>
            <Card
              className='justify-self-stretch'
              sx={{
                width: 800,
                height: 600
              }}
            >
              {user_type == "student" && 
                (<FavoriteTutorList favorite_tutors={favorite_tutors} />)
              }
              <AppointmentList appointments={appointments} />
            </Card>
          </Stack>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default UserDashboard;

export const dashboardLoader: LoaderFunction = async () => {
  const userInfo: Record<string, any> = {};
  const instance = axiosInstance();
  // const userResponse = await instance.get('user/get');
  // if (userResponse.status != 200) {
  //   throw json({
  //     ...userResponse.data,
  //     status: userResponse.data,
  //   });
  // }
  // userInfo.userInfo = userResponse.data;
  const appointmentsResponse = await instance.get('appointments/get');
  if (appointmentsResponse.status != 200) {
    throw json({
      ...appointmentsResponse.data,
      status: appointmentsResponse.data,
    });
  }
  userInfo.appointments = appointmentsResponse.data;
  const favoritesResponse = await instance.get('favorite/get');
  if (favoritesResponse.status != 200) {
    throw json({
      ...favoritesResponse.data,
      status: favoritesResponse.data,
    });
  }
  userInfo.favorite_tutors = favoritesResponse.data;
  return appointmentsResponse.data;
};
