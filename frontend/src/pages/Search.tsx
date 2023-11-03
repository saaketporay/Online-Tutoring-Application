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
    MuiComponent: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const DUMMY_DATA = {
  1: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@test.com',
    about_me: 'I love teaching math!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 30,
  },
  2: {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@test.com',
    about_me: 'I love teaching science!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 45,
  },
  3: {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@test.com',
    about_me: 'I love teaching history!',
    profile_picture:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    total_tutoring_hours: 20,
  },
};

const DUMMY_TUTORS = Object.entries(DUMMY_DATA).map(([key, val]) => ({
  label: `${val.first_name} ${val.last_name}`,
  tutor_id: key,
}));

const getOptionEquality = (option: { label: string }, value: TutorInput) =>
  option.label === value.label;

interface TutorInput {
  label: string;
  tutor_id: string;
}

const defaultTutorInput = { label: '', tutor_id: '' };

const Search = () => {
  const [selectedTutor, setSelectedTutor] =
    useState<TutorInput>(defaultTutorInput);

  const tutorSelectChangeHandler = (
    e: React.FormEvent<EventTarget>,
    value: TutorInput,
    reason: string
  ) => {
    if (reason === 'clear') {
      defaultTutorInput;
      return;
    }
    setSelectedTutor(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='grid justify-center bg-[#191919]'>
        <Typography
          variant='h4'
          className='my-24 justify-self-center'>
          Search for a Tutor
        </Typography>
        <Stack spacing={6}>
          <Autocomplete
            freeSolo
            autoSelect
            id='instructor-search'
            className='w-[500px]'
            options={DUMMY_TUTORS}
            disablePortal
            value={selectedTutor}
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
          {selectedTutor === defaultTutorInput ? (
            Object.entries(DUMMY_DATA).map(([key, val]) => (
              <Accordion>
                <AccordionSummary id={key}>
                  <Typography className='text-center'>
                    {`${val.first_name} ${val.last_name}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography></Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <></>
          )}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Search;
