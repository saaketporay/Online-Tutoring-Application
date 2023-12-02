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
  redirect,
} from 'react-router-dom';
import { createTheme } from '@mui/material';
import FavoriteTutorList from '../components/FavoriteTutorList';
import AppointmentList from '../components/AppointmentList';
import UserCardContent from '../components/UserCardContent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowModal } from '../redux/modalSlice';
import { axiosInstance } from '../utils/axios';
import { store } from '../redux/store';
import { AxiosError } from 'axios';
import { setExpiration, setToken } from '../redux/authSlice';

const theme = createTheme(cardTheme, textFieldTheme, {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '325px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#404040',
          },
        },
      },
    },
  },
});

export type appointmentType = {
  User: {
    first_name: string;
    last_name: string;
    email: string;
  };
  Tutor: {
    User: {
      first_name: string;
      last_name: string;
      email: string;
    };
    about_me: string;
    profile_picture: string;
    tutor_id: number;
  };
  date_time: string;
  duration: number;
  meeting_title: string;
  meeting_desc: string;
  appointment_id: number;
};

export type favoriteTutorsType = [
  {
    Tutor: {
      User: {
        first_name: string;
        last_name: string;
        email: string;
      };
      about_me: string;
      profile_picture: string;
      tutor_id: number;
    };
  }
];

export type userType = {
  first_name: string;
  last_name: string;
  email: string;
  total_tutoring_hours: number;
  user_type: 'student' | 'tutor' | undefined;
};

export type tutorType = {
  profile_picture: string | undefined;
  about_me: string;
};

export type userProps = {
  user: userType;
  tutor: tutorType | undefined;
  appointments: appointmentType[];
  favorite_tutors: favoriteTutorsType;
};

const UserDashboard = () => {
  const userInfo = useLoaderData() as userProps;
  const { user, tutor, appointments, favorite_tutors } = userInfo;
  const dispatch = useAppDispatch();
  const user_type = useAppSelector((state) => state.auth.user_type);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    navigate('/dashboard');
  };
  return (
    <>
      <Box className='grid justify-center bg-[#191919]'>
        <ThemeProvider theme={roundButtonTheme}>
          <Outlet
            context={{
              handleCloseModal,
              userInfo,
            }}
          />
          {user_type != 'tutor' ? (
            <Button
              to='/new-appt'
              component={RouterLink}
              className='my-8 py-3 mx-96'
              sx={{
                backgroundColor: '#B45309',
                '&:hover': {
                  backgroundColor: '#B45309',
                },
              }}>
              <Typography className='font-bold '>
                Schedule appointment
              </Typography>
            </Button>
          ) : (
            <Button
              className='my-8 py-3 mx-96'
              sx={{
                backgroundColor: '#BE185D',
                '&:hover': {
                  backgroundColor: '#BE185D',
                },
              }}>
              <Link
                to='/edit-tutor-profile'
                component={RouterLink}
                className='no-underline'
                color='#F4F4F4'>
                <Typography className='font-bold'>Edit Profile</Typography>
              </Link>
            </Button>
          )}
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Stack
            direction={'row'}
            spacing={3}>
            <Card
              sx={{
                width: 250,
                height: 600,
              }}>
              <UserCardContent
                first_name={user.first_name}
                last_name={user.last_name}
                total_tutoring_hours={user.total_tutoring_hours}
                profile_picture={tutor?.profile_picture}
              />
            </Card>
            <Card
              className='justify-self-stretch'
              sx={{
                width: 800,
                height: 600,
                overflow: 'auto',
              }}>
              {user_type == 'student' && (
                <FavoriteTutorList favorite_tutors={favorite_tutors} />
              )}
              <AppointmentList
                appointments={appointments}
                favorite_tutors={favorite_tutors}
              />
            </Card>
          </Stack>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default UserDashboard;

export const dashboardLoader: LoaderFunction = async () => {
  const userData: Record<string, any> = {};
  const instance = axiosInstance();
  try {
    const userResponse = await instance.get('/user/info');
    userData.user = userResponse.data.user;
    userData.appointments = userResponse.data.appointments.filter(
      (appt: appointmentType) => new Date() <= new Date(appt.date_time)
    );
    if (store.getState().auth.user_type == 'student') {
      const favoritesResponse = await instance.get('/favorite/get');
      if (favoritesResponse.status != 200) {
        throw json({
          ...favoritesResponse.data,
          status: favoritesResponse.data,
        });
      }
      userData.favorite_tutors = favoritesResponse.data;
    } else {
      userData.tutor = userResponse.data.tutor;
    }
    return userData;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status == 401) {
        store.dispatch(setExpiration(''));
        store.dispatch(setToken(''));
        return redirect('/');
      } else {
        throw json({
          message: e.message,
          status: e.response?.status,
        });
      }
    } else {
      return redirect('/');
    }
  }
};
