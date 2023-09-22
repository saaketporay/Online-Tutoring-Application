import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    name: string;
    times: { day: string; from: string; to: string }[];
  }[];
} = {
  'CS 1336': [
    { name: 'Shyam Karrah', times: [] },
    { name: 'Srimathi Srinvasan', times: [] },
    { name: 'Laurie Tompson', times: [] },
  ],
  'CS 1337': [
    { name: 'Scott Dollinger', times: [] },
    { name: 'Miguel Razo Razo', times: [] },
    { name: 'Srimathi Srinivasan', times: [] },
    { name: 'Khiem Le', times: [] },
    { name: 'Jeyakesavan Veerasamy', times: [] },
    { name: 'Jason Smith', times: [] },
    { name: 'Doug DeGroot', times: [] },
  ],
};

for (const course in DUMMY_DATA) {
  for (const instructor_data of DUMMY_DATA[course]) {
    instructor_data.times = DUMMY_TIMES;
  }
}

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
  },
});

const MeetingScheduler = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<string>('');

  const availableTutors = selectedCourse
    ? DUMMY_DATA[selectedCourse].map((tutorInfo) => ({
        label: tutorInfo.name,
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

  return (
    <Box className='grid place-content-center bg-[#191919]'>
      <Stack
        className='mt-24'
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
          </Box>
          <Box>
            <Typography
              variant='h4'
              align='center'>
              Fill out details
            </Typography>
          </Box>
        </ThemeProvider>
      </Stack>
    </Box>
  );
};

export default MeetingScheduler;
