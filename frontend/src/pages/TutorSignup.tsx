import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { radioButtonGroupTheme } from '../theme';
import ScheduleSelector from 'react-schedule-selector';
import Box from '@mui/material/Box';

import { useState } from 'react';

const theme = createTheme(radioButtonGroupTheme, {
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
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
        noOptions: {
          color: '#f5f5f5',
        },
        tag: {
          color: '#f5f5f5',
          backgroundColor: '#404040',
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#f5f5f5',
          },
          '& .MuiFormLabel-root': {
            color: '#f5f5f5',
          },
          // Normal/multiline TextField styles
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#404040',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#f5f5f5',
          },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#f5f5f5',
          },
          // Number TextField styles
          '& label.Mui-focused': {
            color: '#f5f5f5',
          },
          '& .MuiOutlinedInput-root input[type="number"] + fieldset': {
            borderColor: '#404040',
          },
          '& .MuiOutlinedInput-root input[type="number"]:hover + fieldset': {
            borderColor: '#f5f5f5',
          },
          '& .MuiOutlinedInput-root input[type="number"]:focus + fieldset': {
            borderColor: '#f5f5f5',
          },
        },
      },
    },
  },
});

const DUMMY_COURSES = [{ label: 'CS 1336' }, { label: 'CS 1337' }];

const getLastSunday = () => {
  const t = new Date();
  t.setDate(t.getDate() - t.getDay());
  return t;
};

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const TutorSignup = () => {
  const [isCriminal, setIsCriminal] = useState<string>('no');
  const [aboutMe, setAboutMe] = useState<string>('');
  const [courses, setCourses] = useState<{ label: string }[]>([]);
  const [schedule, setSchedule] = useState<Array<Date>>([]);
  const [startHr, setStartHr] = useState<number>(9);
  const [endHr, setEndHr] = useState<number>(17);
  const [hrChunks, setHrChunks] = useState<number>(2);

  const formSubmitHandler = () => {
    console.log(isCriminal, aboutMe, courses, schedule);
    setAboutMe('');
    setCourses([]);
    setSchedule([]);
  };

  return (
    <FormControl className='grid place-content-center bg-[#191919]'>
      <ThemeProvider theme={theme}>
        <Typography
          variant='h4'
          align='center'
          className='mt-24'>
          Please enter the following information
        </Typography>
        <Stack
          className='mt-20 mb-24'
          spacing={16}>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Are you a criminal (???)
            </Typography>
            <Stack
              spacing={2}
              className='grid place-content-center'>
              <FormLabel id='criminal-radio-btn-grp-label'>
                Please select either 'yes' or 'no'
              </FormLabel>
              <RadioGroup
                aria-labelledby='criminal-radio-btn-grp-label'
                value={isCriminal}
                onChange={(e) => {
                  //e.persist();
                  setIsCriminal(e.target.value);
                }}
                name='criminal-radio-btn-grp'>
                <FormControlLabel
                  value='no'
                  control={<Radio />}
                  label='No'
                />
                <FormControlLabel
                  value='yes'
                  control={<Radio />}
                  label='Yes'
                />
              </RadioGroup>
            </Stack>
          </Stack>
          <Stack
            spacing={6}
            className='grid place-content-center'>
            <Typography
              variant='h5'
              align='center'>
              Please enter an "About me"
            </Typography>
            <TextField
              id='tutor-about-me-field'
              label='About me'
              multiline
              rows={3}
              value={aboutMe}
              onChange={(e) => {
                setAboutMe(e.target.value);
              }}
            />
          </Stack>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Select the courses you are able to teach
            </Typography>
            <Autocomplete
              multiple
              id='tutor-course-select'
              options={DUMMY_COURSES}
              disablePortal
              onChange={(e, v) => {
                setCourses(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Courses'
                />
              )}
              isOptionEqualToValue={getOptionEquality}
            />
          </Stack>
          <Stack
            spacing={6}
            className='w-full'>
            <Typography
              variant='h5'
              align='center'>
              Select your available times
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <TextField
                id='startingHour'
                label='Starting Hour'
                type='number'
                className='w-28'
                focused
                InputProps={{ inputProps: { min: 1, max: endHr - 1 } }}
                value={startHr}
                onChange={(e) => {
                  setStartHr(+e.target.value);
                }}
              />
              <TextField
                id='endingHour'
                label='Ending Hour'
                type='number'
                className='w-28'
                focused
                InputProps={{ inputProps: { min: startHr + 1, max: 24 } }}
                value={endHr}
                onChange={(e) => {
                  setEndHr(+e.target.value);
                }}
              />
              <TextField
                id='hourlyChunks'
                label='Hourly Chunks'
                type='number'
                className='w-28'
                focused
                InputProps={{ inputProps: { min: 1, max: 6 } }}
                value={hrChunks}
                onChange={(e) => {
                  setHrChunks(+e.target.value);
                }}
              />
            </Box>
            <ScheduleSelector
              selection={schedule}
              minTime={startHr}
              maxTime={endHr}
              hourlyChunks={hrChunks}
              startDate={getLastSunday()}
              dateFormat='ddd'
              timeFormat='h:mm a'
              onChange={setSchedule}
            />
          </Stack>
          <Button
            variant='contained'
            color='success'
            size='large'
            className='mx-auto'
            disabled={!aboutMe || courses.length == 0 || schedule.length == 0}
            onClick={formSubmitHandler}>
            Submit
          </Button>
        </Stack>
      </ThemeProvider>
    </FormControl>
  );
};

export default TutorSignup;
