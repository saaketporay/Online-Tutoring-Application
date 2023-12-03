import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { axiosInstance } from '../utils/axios';
import { json, useLoaderData, LoaderFunction } from 'react-router-dom';
import { Subject, FormattedSubject } from '../components/TutorSignupInfo';

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

interface Tutors {
  [key: string]: {
    email: string;
    about_me: string;
    profile_picture: string;
    total_tutoring_hours: number;
  };
}

interface Response {
  tutors: Tutors;
  subjects: Subject[];
}

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const Search = () => {
  const responseData = useLoaderData() as Response;

  const [tutors, setTutors] = useState<Tutors>(responseData.tutors);
  const [selectedSubject, setSelectedSubject] =
    useState<FormattedSubject | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<string>('');

  const formattedTutors = Object.keys(tutors).map((key) => ({
    label: key,
  }));
  const selectedTutorInfo = tutors[selectedTutor];
  const formattedSubjects = responseData.subjects.map((subject) => ({
    label: subject.subject_name,
    subject_id: subject.subject_id,
  })) as FormattedSubject[];

  const fetchTutors = async (subject_id: number) => {
    const instance = axiosInstance();
    const response = await instance.get(`/availability/tutors/${subject_id}`);
    if (response.status !== 200) {
      throw json({
        ...response.data,
        status: response.status,
      });
    }
    setTutors(response.data as Tutors);
  };

  const subjectSelectChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    v: FormattedSubject | null
  ) => {
    if (v?.subject_id !== -1) {
      setSelectedSubject(v);
      fetchTutors(v!.subject_id);
    }
  };

  const subjectSelectInputChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    _value: string,
    reason: string
  ) => {
    if (reason === 'clear') {
      setSelectedSubject(null);
      setSelectedTutor('');
      setTutors(responseData.tutors);
      return;
    }
  };

  const tutorSelectChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'clear') {
      setSelectedTutor('');
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
        <Autocomplete
          id='instructor-search-subject'
          className='w-[500px] mb-20'
          options={formattedSubjects}
          disablePortal
          onChange={subjectSelectChangeHandler}
          onInputChange={subjectSelectInputChangeHandler}
          value={selectedSubject}
          isOptionEqualToValue={getOptionEquality}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Filter by subject'
              name='subject'
            />
          )}
        />
        <Autocomplete
          id='instructor-search-name'
          className='w-[500px] mb-20'
          options={formattedTutors}
          value={selectedTutor ? { label: selectedTutor } : null}
          disablePortal
          onInputChange={tutorSelectChangeHandler}
          isOptionEqualToValue={getOptionEquality}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search by tutor name'
              name='tutor'
            />
          )}
        />
        {selectedTutor === '' || !(selectedTutor in tutors) ? (
          Object.entries(tutors).map(([key, val]) => (
            <Accordion key={key}>
              <AccordionSummary>
                <Typography>{key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Stack
                    direction='row'
                    spacing={2}
                    className='flex items-center justify-evenly'>
                    <Avatar
                      variant='square'
                      sx={{
                        height: 75,
                        width: 75,
                      }}
                      className='max-w-[100px] h-auto mx-3'
                      src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/${val.profile_picture}`}
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
                src={`${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/${selectedTutorInfo.profile_picture}`}
                alt={`${selectedTutor}'s profile picture`}
              />
              <Stack spacing={2}>
                <Typography>{selectedTutorInfo.about_me}</Typography>
                <Typography>{`Total tutoring hours: ${selectedTutorInfo.total_tutoring_hours}`}</Typography>
                <Typography>{selectedTutorInfo.email}</Typography>
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export const loader: LoaderFunction = async () => {
  const responseData: Record<any, any> = {};

  let instance = axiosInstance();
  let response = await instance.get('/availability/tutors');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  responseData.tutors = response.data;

  instance = axiosInstance();
  response = await instance.get('/availability/subjects');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  responseData.subjects = response.data;

  return responseData as Response;
};

export default Search;
