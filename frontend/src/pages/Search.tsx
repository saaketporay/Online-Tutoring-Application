import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { autocompleteTheme } from '../theme';

const theme = createTheme(autocompleteTheme, {
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d2d',
          color: '#f5f5f5',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '& .MuiAccordionSummary-content': {
            justifyContent: 'center',
          },
        },
      },
    },
  },
});

interface DUMMY_DATA_TYPE {
  [key: string]: {
    email: string;
    about_me: string;
    profile_picture: string;
    total_tutoring_hours: number;
  };
}

const DUMMY_DATA: DUMMY_DATA_TYPE = {
  'John Doe': {
    email: 'john.doe@test.com',
    about_me: 'I love teaching math!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 30,
  },
  'Jane Doe': {
    email: 'jane.doe@test.com',
    about_me: 'I love teaching science!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 45,
  },
  'John Smith': {
    email: 'john.smith@test.com',
    about_me: 'I love teaching history!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 20,
  },
};

const DUMMY_TUTORS = Object.keys(DUMMY_DATA).map((key) => ({
  label: key,
}));

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const Search = () => {
  const [selectedTutor, setSelectedTutor] = useState<string>('');

  const tutorSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'clear') {
      setSelectedTutor('');
      return;
    }
    setSelectedTutor(value);
  };

  const tutorInfo = DUMMY_DATA[selectedTutor];

  return (
    <ThemeProvider theme={theme}>
      <Box className='grid justify-center bg-[#191919]'>
        <Typography
          variant='h4'
          className='my-24 justify-self-center'>
          Search for a Tutor
        </Typography>
        <Autocomplete
          freeSolo
          autoSelect
          id='instructor-search'
          className='w-[500px] mb-20'
          options={DUMMY_TUTORS}
          value={selectedTutor ? { label: selectedTutor } : null}
          disablePortal
          onInputChange={tutorSelectChangeHandler}
          isOptionEqualToValue={getOptionEquality}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search'
              name='tutor'
            />
          )}
        />
        {selectedTutor === '' || !(selectedTutor in DUMMY_DATA) ? (
          Object.entries(DUMMY_DATA).map(([key, val]) => (
            <Accordion>
              <AccordionSummary>
                <Typography>{key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Stack
                    direction='row'
                    spacing={2}
                    className='flex items-center'>
                    <img
                      className='max-w-[100px] h-auto rounded-full mx-3'
                      src={val.profile_picture}
                      alt={`${key}'s profile picture`}
                    />
                    <Stack
                      spacing={2}
                      className='w-full flex justify-center'>
                      <Typography>{val.about_me}</Typography>
                      <Typography>{`${val.total_tutoring_hours} total tutoring hours`}</Typography>
                      <Typography>{val.email}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box>
            <Stack
              direction='row'
              spacing={2}>
              <img
                className='max-w-[100px] h-auto rounded-full'
                src={tutorInfo.profile_picture}
                alt={`${selectedTutor}'s profile picture`}
              />
              <Stack
                spacing={2}
                className='items-center'>
                <Typography>{tutorInfo.about_me}</Typography>
                <Typography>{`Total tutoring hours: ${tutorInfo.total_tutoring_hours}`}</Typography>
                <Typography>{tutorInfo.email}</Typography>
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Search;
