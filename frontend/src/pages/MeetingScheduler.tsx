import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { autocompleteTheme } from '../utils/theme';
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
import { store } from '../redux/store';

<<<<<<< HEAD
// TODO: Update based on updated table
interface TimeslotType {
  tutor_availiability_id: number;
  subject_id: number;
  tutor_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  readable_date_time: string;
}

interface ResponseDataType {
  [key: string]: {
    [key: string]: TimeslotType[];
=======
interface ResponseDataType {
  [key: string]: {
    [key: string]: {
      subject_id: number;
      tutor_id: number;
      date_time: string;
      duration: number;
      readable_date_time: string;
    }[];
>>>>>>> main
  };
}

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
  const [meetingInfo, setMeetingInfo] = useState<TimeslotType>({
    tutor_availiability_id: 0,
    subject_id: 0,
    tutor_id: 0,
    weekday: '',
    start_time: '',
    end_time: '',
    readable_date_time: '',
  });

  const availableTutors = selectedCourse
    ? Object.keys(data[selectedCourse]).map((name) => ({
        label: name,
      }))
    : [];

  const availableTimeslots =
    selectedCourse && selectedTutor && selectedTutor in data[selectedCourse]
      ? data[selectedCourse][selectedTutor].map((timeslot) => ({
          label: timeslot.readable_date_time,
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
    setMeetingInfo(
      data[selectedCourse][selectedTutor].find(
        (timeslot) => timeslot.readable_date_time === selectedTimeslot
      )!
    );
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
          name='meeting_info'
          value={JSON.stringify(meetingInfo)}></input>
      </ThemeProvider>
    </Form>
  );
};

export const getReadableDateTime = (dateTime: string, duration: number) => {
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

  // Split dateTime (formatted like YYYY-MM-DD hh:mm:ss) into an array of strings based on dashes, spaces, or colons
  const t = dateTime.split(/[- :]/).map((str) => +str);
  // Create a new Date object based on the year, month, day, etc, values from t
  const m = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
  // Get the day as a number in the range 1-31
  const day = m.getDate();
  // Select the appropriate suffix for the numerical day
  const suffix =
    (suffixMap.has(day.toString()) ? suffixMap.get(day.toString()) : 'th') ||
    '';
  // Get the hour as a number in the range 0-23
  const hour = m.getHours();
  // Convert hour to a human-readable 12-hour value
  const modifiedHour =
    hour === 0 || hour === 11 ? 12 : hour < 11 ? hour : hour - 12;
  // Get the minutes as a number in the range 0-59
  const minutes = m.getMinutes();
  // Convert minutes to a double-digit zeros if it's a 0
  const modifiedMinutes = minutes === 0 ? '00' : minutes;
  // Check whether an 'am' or 'pm' should be present
  const am = hour < 11;
  // Construct the human-readable date time value to display in the available timeslots autocomplete
  const readable_date_time = `${weekday[m.getDay()]}, ${
    month[m.getMonth()]
  } ${day}${suffix}, ${m.getFullYear()} - ${modifiedHour}:${modifiedMinutes}${
    am ? 'am' : 'pm'
  }, ${duration}m`;

  return readable_date_time;
};

export const loader: LoaderFunction = async () => {
  // Retrieve logged in user's token
  const token = store.getState().auth.token;
  if (!token) {
    return redirect('/signin');
  }

  const response = await axios.get('availability/all');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  const data = response.data as ResponseDataType;
  console.log(data);

  // For every subject
  for (const [subjectName, tutorsObject] of Object.entries(data)) {
    // For every tutor
    for (const [tutorName, timeslotsArr] of Object.entries(tutorsObject)) {
      // For every timeslot
      for (let i = 0; i < timeslotsArr.length; i++) {
        const timeslot = data[subjectName][tutorName][i];
        const readable_date_time = getReadableDateTime(
          timeslot.date_time,
          timeslot.duration
        );
        timeslot.readable_date_time = readable_date_time;
      }
    }
  }

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userInfo = Object.fromEntries(formData);
  console.log(userInfo);

  // Retrieve logged in user's token
  const token = store.getState().auth.token;
  if (!token) {
    return redirect('/signin');
  }
  userInfo.token = token;

  const meetingInfo = JSON.parse(
    userInfo.meeting_info as string
  ) as TimeslotType;

  const payload = {
    token,
<<<<<<< HEAD
    subject_id: meetingInfo.subject_id,
    tutor_id: meetingInfo.tutor_id,
    start_time: meetingInfo.start_time,
    end_time: meetingInfo.end_time,
=======
    subject_id: timeslot.subject_id,
    tutor_id: timeslot.tutor_id,
    date_time: timeslot.date_time,
    duration: timeslot.duration,
>>>>>>> main
    meeting_title: userInfo.meeting_title,
    meeting_desc: userInfo.meeting_desc,
  };
  console.log(payload);

  const response = await axios.post('/appointments/create', userInfo);
  console.log(response);
  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  // TODO: add logged in student's id to redirect to the right dashboard
  return redirect('/dashboard');
};

export default MeetingScheduler;
