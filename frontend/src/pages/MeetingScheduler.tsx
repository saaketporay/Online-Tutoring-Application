import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useState } from 'react';

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

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            color: '#f5f5f5',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#404040',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f5f5f5',
          },
          '& .MuiAutocomplete-endAdornment .MuiButtonBase-root .MuiSvgIcon-root':
            {
              color: '#f5f5f5',
            },
        },
        input: {
          color: '#f5f5f5',
        },
        paper: {
          backgroundColor: '#404040',
        },
        option: {
          color: '#f5f5f5',
        },
      },
    },
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

const MeetingScheduler = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<string>('');
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>('');

  const availableTutors = selectedCourse
    ? Object.keys(DUMMY_DATA[selectedCourse]).map((name) => ({
        label: name,
      }))
    : [];

  const availableTimeslots = selectedTutor
    ? DUMMY_DATA[selectedCourse][selectedTutor].map((timeslot) => ({
        label: `${timeslot.day} ${timeslot.from} - ${timeslot.to}`,
      }))
    : [];

  const courseSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: { label: string } | null
  ) => {
    if (value) {
      setSelectedCourse(value.label);
    }
  };

  const tutorSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: { label: string } | null
  ) => {
    if (value) {
      setSelectedTutor(value.label);
    }
  };

  const timeslotSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: { label: string } | null
  ) => {
    if (value) {
      setSelectedTimeslot(value.label);
    }
  };

  return (
    <Box className='grid place-content-center bg-[#191919]'>
      <Stack
        className='my-24'
        spacing={16}>
        <ThemeProvider theme={theme}>
          <Box>
            <Typography
              variant='h4'
              align='center'>
              Schedule a new appointment
            </Typography>
            <Autocomplete
              id='course-select'
              options={DUMMY_COURSES}
              disablePortal
              className='my-16'
              onChange={courseSelectChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Course'
                />
              )}
            />
            <Autocomplete
              id='instructor-select'
              options={availableTutors}
              disablePortal
              className='my-16'
              onChange={tutorSelectChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Tutor'
                />
              )}
            />
          </Box>
          <Box>
            <Typography
              variant='h4'
              align='center'>
              Select an available timeslot
            </Typography>
            <Autocomplete
              id='timeslot-select'
              options={availableTimeslots}
              disablePortal
              className='my-16'
              onChange={timeslotSelectChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Timeslot'
                />
              )}
            />
          </Box>
          <Box>
            <Typography
              variant='h4'
              align='center'>
              Fill out details
            </Typography>
          </Box>
          <Box className='mx-auto'>
            <Button
              variant='contained'
              color='success'
              size='large'
              disabled>
              Submit
            </Button>
          </Box>
        </ThemeProvider>
      </Stack>
    </Box>
  );
};

export default MeetingScheduler;
