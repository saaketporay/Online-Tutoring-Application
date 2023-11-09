import { roundButtonTheme, textFieldTheme } from '../utils/theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';
import {
  Link as RouterLink,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useSearchParams,
  useNavigate,
  json
} from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleModal } from "../redux/modalSlice";
import axios from 'axios';

const DUMMY_STUDENT_INFO = {
  first_name: "John",
  last_name: "Smith",
  email: "johnsmith@gmail.com",
  total_meeting_time: "32 h",
  avg_meeting_time_per_course: "1.5 h",
  avg_meeting_time_per_user: "8 h",
  monthly_meeting_time: "12 h",
  avg_monthly_meeting_time: "16 h",
  avg_weekly_meeting_time: "4h",
  user_type: "student",
  user_id: "qwer",
  appointments: [
    {
      student_name: "John Smith",
      tutor_name: "James Smith",
      course: 'CS 2305',
      day: 'Monday',
      time: '11:15 am - 12:15 pm',
      id: '1'
    },
    {
      student_name: "John Smith",
      tutor_name: 'Maria Garcia',
      course: 'CS 2336',
      day: 'Thursday',
      time: '3 pm - 4 pm',
      id: '2'
    },
  ],
  favorite_tutors: [
    {
      tutor_name: "James Smith",
    },
    {
      tutor_name: "Maria Garcia",
    },
    {
      tutor_name: "Anurag Nagar",
    },
    {
      tutor_name: "John Cole",
    },
    {
      tutor_name: "Deepak Kumar",
    },
    {
      tutor_name: "James Wilson",
    },
    {
      tutor_name: "James Franco",
    },
    {
      tutor_name: "Vince Gilligan",
    },
    {
      tutor_name: "Johnathan Carpenter",
    },
  ],
};

const DUMMY_TUTOR_INFO = {
  first_name: "James",
  last_name: "Smith",
  email: "jamesmith@outlook.com",
  total_meeting_time: "16 h",
  avg_meeting_time_per_course: "1 h",
  avg_meeting_time_per_user: "2 h",
  monthly_meeting_time: "9 h",
  avg_monthly_meeting_time: "8 h",
  avg_weekly_meeting_time: "2h",
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

const theme = createTheme(roundButtonTheme, textFieldTheme, {
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

const UserDashboard = () => {
  const loaderData = useLoaderData();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(toggleModal());
    navigate('/dashboard');
  };

  return (
    <>
      <Box className="grid justify-items-center bg-[#191919]">
        <ThemeProvider theme={theme}>
          <Outlet context={handleModalClose} />
          {DUMMY_STUDENT_INFO.user_type != "tutor" ? // temporary, this will be provided by loaderData when backend endpoints are ready
            <Button
              to='/new-appt'
              component={RouterLink}
              className='my-8 py-3 px-16'
              sx={{
                backgroundColor: '#B45309',
                "&:hover": {
                  backgroundColor: '#B45309'
                }
              }}>
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
        <Dashboard {...DUMMY_STUDENT_INFO} />
      </Box>
    </>
  );
};

export default UserDashboard;

export const dashboardLoader: LoaderFunction = async () => {
  return null;
  // const response = await axios.get('/user/info')
  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     status: response.data
  //   });
  // }
  // return response.data;
};
