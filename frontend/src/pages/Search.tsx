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
import axios from 'axios';
import { json, useLoaderData, LoaderFunction } from 'react-router-dom';

import { autocompleteTheme } from '../utils/theme';

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

interface RESPONSE_DATA_TYPE {
  [key: string]: {
    email: string;
    about_me: string;
    profile_picture: string;
    total_tutoring_hours: number;
  };
}

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const Search = () => {
  const tutorData = useLoaderData() as RESPONSE_DATA_TYPE;

  const [selectedTutor, setSelectedTutor] = useState<string>('');

  const tutorList = Object.keys(tutorData).map((key) => ({
    label: key,
  }));

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

  const tutorInfo = tutorData[selectedTutor];

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
          options={tutorList}
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
        {selectedTutor === '' || !(selectedTutor in tutorData) ? (
          Object.entries(tutorData).map(([key, val]) => (
            <Accordion>
              <AccordionSummary>
                <Typography>{key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Stack
                    direction='row'
                    spacing={2}
                    className='flex items-center justify-evenly'>
                    <img
                      className='max-w-[100px] h-auto rounded-full mx-3'
                      src={val.profile_picture}
                      alt={`${key}'s profile picture`}
                    />
                    <Stack spacing={2}>
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
          <Box className='bg-[#2d2d2d] text-[#f5f5f5] p-5 rounded-md'>
            <Stack
              direction='row'
              spacing={2}
              className='flex items-center justify-evenly'>
              <img
                className='max-w-[100px] h-auto rounded-full'
                src={tutorInfo.profile_picture}
                alt={`${selectedTutor}'s profile picture`}
              />
              <Stack spacing={2}>
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

export const loader: LoaderFunction = async () => {
  const response = await axios.get('availability/tutors');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  console.log(response.data);
  return response.data as RESPONSE_DATA_TYPE;
};

export default Search;
