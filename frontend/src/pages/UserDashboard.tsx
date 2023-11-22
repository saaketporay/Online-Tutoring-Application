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
import { store } from '../redux/store';

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

export type appointmentsType = [{
  User: {
    first_name: string,
    last_name: string,
  },
  Tutor: {
    User: {
      first_name: string,
      last_name: string,
    }
    about_me: string,
    profile_picture: string,
    tutor_id: string,
  },
  date_time: Date,
  duration: number,
  meeting_title: string,
  meeting_desc: string,
  appointment_id: number,
}];

export type favoriteTutorsType = [{
  Tutor: {
    User: {
      first_name: string,
      last_name: string,
    }
    about_me: string,
    profile_picture: string,
    tutor_id: number,
  },
}];

export type userType = {
  first_name: string,
  last_name: string,
  email: string,
  total_tutoring_hours: number,
  user_type: 'student' | 'tutor' | undefined,
}

export type userProps = {
  user: userType,
  appointments: appointmentsType,
  favorite_tutors: favoriteTutorsType,
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
  return (
    <>
      <Box className="grid justify-center bg-[#191919]">
        <ThemeProvider theme={roundButtonTheme}>
          <Outlet context={{
              handleCloseModal,
              userInfo
            }} 
          />
          {user_type != "tutor" ?
            <Button
              to='/new-appt'
              component={RouterLink}
              className='my-8 py-3 mx-96'
              sx={{
                backgroundColor: '#B45309',
                "&:hover": {
                  backgroundColor: '#B45309'
                }
              }}
            >
              <Typography className="font-bold ">
                Schedule appointment
              </Typography>
            </Button>
            :
            <Button
              className='my-8 py-3 mx-96'
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
                first_name={userInfo.user.first_name}
                last_name={userInfo.user.last_name}
                total_tutoring_hours={userInfo.user.total_tutoring_hours}
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
                (<FavoriteTutorList favorite_tutors={userInfo.favorite_tutors} />)
              }
              <AppointmentList appointments={userInfo.appointments} />
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
  const userResponse = await instance.get('/user/info');
  if (userResponse.status != 200) {
    throw json({
      ...userResponse.data,
      status: userResponse.data,
    });
  }
  userData.user = userResponse.data.user;
  userData.appointments = userResponse.data.appointments;
  if (store.getState().auth.user_type == 'student') {
    const favoritesResponse = await instance.get('/favorite/get');
    if (favoritesResponse.status != 200) {
      throw json({
        ...favoritesResponse.data,
        status: favoritesResponse.data,
      }); 
    }
    userData.favorite_tutors = favoritesResponse.data;
  }
  // console.log(userData)
  return userData;
};
