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
import { radioButtonGroupTheme, autocompleteTheme } from '../theme';
import ScheduleSelector from 'react-schedule-selector';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import GeneralSignupInfo from '../components/GeneralSignupInfo';

import { useState } from 'react';

const theme = createTheme(radioButtonGroupTheme, autocompleteTheme, {
  components: {
    // Custom button theme just for this page since roundButtonTheme/squareButtonTheme messes with the autocompleteTheme
    MuiButton: {
      styleOverrides: {
        root: {
          '&:disabled': {
            backgroundColor: '#404040',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          color: '#f5f5f5',
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
  const [timeRange, setTimeRange] = useState<[number, number]>([9, 17]);
  const [hrChunks, setHrChunks] = useState<number>(2);

  const submitHandler = () => {
    console.log(isCriminal, aboutMe, courses, schedule);
    setAboutMe('');
    setCourses([]);
    setSchedule([]);
  };

  const marks = [];
  for (let i = 0; i <= 24; i++) {
    if (i % 2 == 1) {
      continue;
    }
    marks.push({
      value: i,
      label: i != 0 ? `${i <= 12 ? i : i - 12}${i < 12 ? 'am' : 'pm'}` : '12am',
    });
  }

  const timeRangeSliderChangeHandler = (
    e: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTimeRange([Math.min(newValue[0], timeRange[1] - 1), timeRange[1]]);
    } else {
      setTimeRange([timeRange[0], Math.max(newValue[1], timeRange[0] + 1)]);
    }
  };

  return (
    <FormControl className='grid justify-items-center bg-[#191919]'>
      <ThemeProvider theme={theme}>
        <Typography
          variant='h4'
          align='center'
          className='mt-24 mb-20'>
          Please enter the following information
        </Typography>
        <GeneralSignupInfo />
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
            {/* <TextField
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
              /> */}
            <Box>
              <Typography gutterBottom>Time range</Typography>
              <Slider
                aria-label='Time range'
                getAriaValueText={(value: number) => value.toString()}
                value={timeRange}
                onChange={timeRangeSliderChangeHandler}
                valueLabelDisplay='auto'
                step={1}
                marks={marks}
                min={0}
                max={24}
                disableSwap
              />
            </Box>
            <Box>
              <Typography>Hourly chunks</Typography>
              <Slider
                aria-label='Hourly chunks'
                getAriaValueText={(value: number) => value.toString()}
                value={hrChunks}
                onChange={(e, v) => {
                  setHrChunks(+v);
                }}
                valueLabelDisplay='auto'
                step={1}
                min={1}
                max={6}
                marks
              />
            </Box>
            <ScheduleSelector
              selection={schedule}
              minTime={timeRange[0]}
              maxTime={timeRange[1]}
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
            onClick={submitHandler}>
            Submit
          </Button>
        </Stack>
      </ThemeProvider>
    </FormControl>
  );
};

export default TutorSignup;
