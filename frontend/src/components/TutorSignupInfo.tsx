import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { autocompleteTheme } from '../utils/theme';
import ScheduleSelector from 'react-schedule-selector';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import React, { useState } from 'react';

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

export interface AvailableCourseType {
  subject_id: number;
  subject_name: string;
}

interface TutorSignupInfoProps {
  subjects: AvailableCourseType[];
}

const TutorSignupInfo: React.FC<TutorSignupInfoProps> = ({ subjects }) => {
  const availableCourses = subjects.map((course) => ({
    label: course.subject_name,
  })) as { label: string }[];

  const [aboutMe, setAboutMe] = useState<string>('');
  const [courses, setCourses] = useState<{ label: string }[]>([]);
  const [schedule, setSchedule] = useState<Array<Date>>([]);
  const [timeRange, setTimeRange] = useState<[number, number]>([9, 17]);
  const [hrChunks, setHrChunks] = useState<number>(2);

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
    <ThemeProvider theme={theme}>
      <Stack spacing={6}>
        <TextField
          className='my-6'
          id='tutor-about-me-field'
          name='about_me'
          label='About me'
          multiline
          rows={3}
          value={aboutMe}
          onChange={(e) => {
            setAboutMe(e.target.value);
          }}
        />
        <Box>
          <Typography
            variant='h6'
            align='center'
            className='mb-6'>
            Select the courses you are able to teach
          </Typography>
          <Autocomplete
            multiple
            id='tutor-course-select'
            options={availableCourses}
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
        </Box>
        <Stack spacing={6}>
          <Box>
            <Typography
              variant='h6'
              align='center'
              className='mb-6'>
              Select your available times
            </Typography>
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
        <input
          hidden
          name='courses'
          value={JSON.stringify(courses)}></input>
        <input
          hidden
          name='schedule'
          value={JSON.stringify(schedule)}></input>
        <Button
          variant='contained'
          color='success'
          size='large'
          className='mx-auto'
          disabled={!aboutMe || courses.length == 0 || schedule.length == 0}
          type='submit'>
          Submit
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default TutorSignupInfo;
