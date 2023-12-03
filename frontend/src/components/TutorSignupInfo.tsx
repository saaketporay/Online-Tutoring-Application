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

import { useState } from 'react';

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

const getLastSunday = () => {
  const t = new Date();
  t.setDate(t.getDate() - t.getDay());
  return t;
};

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

export interface Subject {
  subject_id: number;
  subject_name: string;
}

export interface FormattedSubject {
  label: string;
  subject_id: number;
}

export interface TutorInfo {
  first_name: string;
  last_name: string;
  email: string;
  aboutMe: string;
  selectedSubjects: Subject[];
  pfp: string;
}

const TutorSignupInfo = ({
  subjects,
  tutorInfo,
}: {
  subjects: Subject[];
  tutorInfo: TutorInfo | undefined;
}) => {
  const formattedSubjects = subjects.map((course) => ({
    label: course.subject_name,
    subject_id: course.subject_id,
  })) as FormattedSubject[];

  const defaultSelectedSubjects = tutorInfo
    ? (tutorInfo.selectedSubjects.map((course) => ({
        label: course.subject_name,
        subject_id: course.subject_id,
      })) as FormattedSubject[])
    : [];

  const [aboutMe, setAboutMe] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<FormattedSubject[]>(
    defaultSelectedSubjects
  );
  const [schedule, setSchedule] = useState<Array<Date>>([]);
  const [timeRange, setTimeRange] = useState<[number, number]>([9, 17]);
  const [pfp, setPfp] = useState<string>(
    tutorInfo ? `${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/${tutorInfo.pfp}` : ''
  );

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
    _e: Event,
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
        <Stack spacing={4}>
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
          <Box className='flex flex-col items-center'>
            <Button
              variant='outlined'
              component='label'
              className='text-neutral-100 border-neutral-700 rounded-md'>
              Upload profile picture
              <input
                name='profile_picture'
                type='file'
                onChange={(e) => {
                  if (
                    e &&
                    e.target &&
                    e.target.files &&
                    e.target.files.length === 1
                  )
                    setPfp(URL.createObjectURL(e.target.files[0]));
                }}
                hidden
              />
            </Button>
            {pfp && (
              <img
                src={pfp}
                alt='Profile picture'
                className='my-3 w-40 h-full'
              />
            )}
          </Box>
        </Stack>
        <Box>
          <Typography
            variant='h6'
            align='center'
            className='mb-6'>
            Select the courses you are able to teach
          </Typography>
          <Autocomplete
            multiple
            id='tutor-subject-select'
            options={formattedSubjects}
            disablePortal
            onChange={(_e, v) => {
              setSelectedSubjects(v);
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
              getAriaLabel={() => 'Time range'}
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
          <ScheduleSelector
            selection={schedule}
            minTime={timeRange[0]}
            maxTime={timeRange[1]}
            hourlyChunks={1}
            startDate={getLastSunday()}
            dateFormat='ddd'
            timeFormat='h:mm a'
            onChange={setSchedule}
          />
        </Stack>
        <input
          hidden
          name='subjects'
          value={JSON.stringify(selectedSubjects)}
        />
        <input
          hidden
          name='schedule'
          value={JSON.stringify(schedule)}
        />
        <Button
          variant='contained'
          color='success'
          size='large'
          className='mx-auto'
          disabled={
            !aboutMe ||
            selectedSubjects.length == 0 ||
            schedule.length == 0 ||
            pfp.length == 0
          }
          type='submit'>
          Submit
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default TutorSignupInfo;
