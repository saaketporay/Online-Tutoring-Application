import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { autocompleteTheme } from '../theme';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
  json,
  redirect,
} from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

interface ResponseDataType {
  [key: string]: {
    [key: string]: {
      tutor_availiability_id: number;
      tutor_id: number;
      weekday: string;
      start_time: string;
      end_time: string;
      readable_date_time?: string;
    }[];
  };
}

const DUMMY_TIMES = [
  { day: 'Monday', from: '10:30am', to: '12pm' },
  { day: 'Monday', from: '3pm', to: '4pm' },
  { day: 'Wednesday', from: '9:45am', to: '10:45pm' },
  { day: 'Thursday', from: '1pm', to: '2pm' },
  { day: 'Friday', from: '4:15pm', to: '5:30pm' },
];

const DUMMY_DATA: {
  [key: string]: {
    [key: string]: { day: string; from: string; to: string }[];
  };
} = {
  'CS 1336': {
    'Shyam Karrah': DUMMY_TIMES,
    'Srimathi Srinvasan': DUMMY_TIMES,
    'Laurie Tompson': DUMMY_TIMES,
  },
  'CS 1337': {
    'Scott Dollinger': DUMMY_TIMES,
    'Miguel Razo Razo': DUMMY_TIMES,
    'Srimathi Srinivasan': DUMMY_TIMES,
    'Khiem Le': DUMMY_TIMES,
    'Jeyakesavan Veerasamy': DUMMY_TIMES,
    'Jason Smith': DUMMY_TIMES,
    'Doug DeGroot': DUMMY_TIMES,
  },
};

const DUMMY_COURSES = Object.keys(DUMMY_DATA).map((name) => ({ label: name }));

const theme = createTheme(autocompleteTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:disabled': {
            backgroundColor: '#404040',
          },
        },
      },
    },
  },
});

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const MeetingScheduler = () => {
  const data = useLoaderData() as ResponseDataType;

  const courses = Object.keys(data).map((name) => ({
    label: name,
    value: data[name],
  }));

  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<string>('');
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>('');
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingDesc, setMeetingDesc] = useState<string>('');

  const availableTutors = selectedCourse
    ? Object.keys(data[selectedCourse]).map((name) => ({
        label: name,
      }))
    : [];

  const availableTimeslots =
    selectedCourse && selectedTutor && selectedTutor in data[selectedCourse]
      ? data[selectedCourse][selectedTutor].map((timeslot) => ({
          label: timeslot.readable_date_time || '',
        }))
      : [];

  const courseSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'clear') {
      setSelectedCourse('');
      setSelectedTutor('');
      setSelectedTimeslot('');
      return;
    }
    if (reason === 'input') {
      return;
    }
    setSelectedCourse(value);
  };

  const tutorSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'clear') {
      setSelectedTutor('');
      setSelectedTimeslot('');
      return;
    }
    if (reason === 'input') {
      return;
    }
    setSelectedTutor(value);
  };

  const timeslotSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'input') {
      return;
    }
    setSelectedTimeslot(value);
  };

  useEffect(() => {
    if (selectedCourse && selectedTutor) {
      if (!(selectedTutor in data[selectedCourse])) {
        setSelectedTutor('');
        setSelectedTimeslot('');
      } else if (
        selectedTimeslot &&
        !data[selectedCourse][selectedTutor].find(
          (timeslot) => timeslot.readable_date_time === selectedTimeslot
        )
      ) {
        setSelectedTimeslot('');
      }
    }
  }, [selectedCourse, selectedTutor, selectedTimeslot]);

  return (
    <Form
      method='post'
      className='grid place-content-center bg-[#191919]'>
      <ThemeProvider theme={theme}>
        <Stack
          className='my-24'
          spacing={16}>
          <Stack spacing={6}>
            <Typography
              variant='h4'
              align='center'
              className='mb-3'>
              Schedule a new appointment
            </Typography>
            <Autocomplete
              id='student-course-select'
              options={courses}
              disablePortal
              value={selectedCourse ? { label: selectedCourse } : null}
              onInputChange={courseSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Course'
                  name='course'
                />
              )}
            />
            <Autocomplete
              id='instructor-select'
              options={availableTutors}
              disablePortal
              value={selectedTutor ? { label: selectedTutor } : null}
              onInputChange={tutorSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Tutor'
                  name='tutor'
                />
              )}
            />
          </Stack>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Select an available timeslot
            </Typography>
            <Autocomplete
              id='timeslot-select'
              options={availableTimeslots}
              disablePortal
              value={selectedTimeslot ? { label: selectedTimeslot } : null}
              onInputChange={timeslotSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Timeslot'
                  name='timeslot'
                />
              )}
            />
          </Stack>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Fill out details
            </Typography>
            <TextField
              id='meeting-title-field'
              label='Meeting title'
              name='meeting_title'
              required
              value={meetingTitle}
              onChange={(e) => {
                setMeetingTitle(e.target.value);
              }}
            />
            <TextField
              id='meeting-desc-field'
              label='Meeting description'
              name='meeting_desc'
              multiline
              rows={3}
              value={meetingDesc}
              onChange={(e) => {
                setMeetingDesc(e.target.value);
              }}
            />
          </Stack>
          <Button
            variant='contained'
            color='success'
            size='large'
            className='mx-auto'
            disabled={
              !selectedCourse ||
              !selectedTutor ||
              !selectedTimeslot ||
              !meetingTitle
            }
            type='submit'>
            Submit
          </Button>
        </Stack>
        <input
          hidden
          name='data'
          value={JSON.stringify(data)}></input>
      </ThemeProvider>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  // Retrieve logged in user's token
  const token = getAuthToken();
  if (!token) {
    return redirect('/signin');
  }

  const response = await axios.get('/availability/all');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  const data = response.data as ResponseDataType;
  console.log(data);

  // Convert SQL's TIME data type to a JS Date object to a readable date format: Friday, October 27th, 2023, 1:19am, 20m
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const suffixMap = new Map([
    ['1', 'st'],
    ['2', 'nd'],
    ['3', 'rd'],
  ]);

  for (const [subjectName, tutorsObject] of Object.entries(data)) {
    for (const [tutorName, timeslotsArr] of Object.entries(tutorsObject)) {
      for (let i = 0; i < timeslotsArr.length; i++) {
        //     const t = data[subjectName][tutorName][i].start_time;
        //       .split(/[- :]/)
        //       .map((str) => +str);
        //     const m = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        //     const day = m.getDate();
        //     const suffix =
        // (suffixMap.has(day.toString()) ? suffixMap.get(day.toString()) : 'th') ||
        // '';
        //     const hour = m.getHours();
        //     const modifiedHour =
        //       hour === 0 || hour === 11 ? 12 : hour < 11 ? hour : hour - 12;
        //     const minutes = m.getHours();
        //     const modifiedMinutes = minutes === 0 ? '00' : minutes;
        //     const am = hour < 11;
        //     const readable_date_time = `${weekday[m.getDay()]}, ${
        //       month[m.getMonth()]
        //     } ${day}${suffix}, ${m.getFullYear()} - ${modifiedHour}:${modifiedMinutes}${
        //       am ? 'am' : 'pm'
        //     }`;
        const t = data[subjectName][tutorName][i];
        const readable_date_time = `${t.weekday} ${t.start_time}-${t.end_time}`;
        data[subjectName][tutorName][i].readable_date_time = readable_date_time;
      }
    }
  }

  // Add the key readable_date_time to each object in each tutor instance's timeslots array

  return data;
  // TODO: adjust MeetingScheduler to use the new data format
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const userInfo = Object.fromEntries(data);
  console.log(userInfo);

  // Retrieve logged in user's token
  const token = getAuthToken();
  if (!token) {
    return redirect('/signin');
  }
  userInfo.token = token;

  // TODO: extract tutor_id, date_time, and duration from userInfo and make new object with them as well as token

  console.log(userInfo);

  // TODO: make backend accept meeting_title and meeting_desc

  // const response = await axios.post('/user/register?tutor=true', userInfo);
  // console.log(response);
  // if (response.status != 200) {
  //   throw json({
  //     ...response.data,
  //     "status": response.status
  //   })
  // }

  // TODO: add logged in student's id to redirect to the right dashboard
  return redirect('/dashboard');
};

export default MeetingScheduler;
