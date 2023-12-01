import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { autocompleteTheme, datepickerTheme } from '../utils/theme';
import { useState } from 'react';
import { axiosInstance } from '../utils/axios';
import {
  Form,
  useLoaderData,
  LoaderFunction,
  ActionFunction,
  json,
  redirect,
} from 'react-router-dom';
import { store } from '../redux/store';
import { getReadableTime } from '../utils/datetime';

interface Timeslot {
  subject_id: number;
  tutor_id: number;
  date_time: string;
  readable_time: string;
}

const defaultMeetingInfo = {
  subject_id: 0,
  tutor_id: 0,
  date_time: '',
  readable_time: '',
};

interface Response {
  [key: string]: {
    [key: string]: Timeslot[];
  };
}

interface DatePickerValue {
  $y?: string;
  $M?: string;
  $D?: string;
  $d: Date;
}

const theme = createTheme(autocompleteTheme, datepickerTheme, {
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
  },
});

const getOptionEquality = (
  option: { label: string },
  value: { label: string }
) => option.label === value.label;

const checkSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const checkSameTimeslot = (d1: Date, d2: Date) =>
  checkSameDay(d1, d2) &&
  d1.getHours() === d2.getHours() &&
  d1.getMinutes() === d2.getMinutes();

const MeetingScheduler = () => {
  const data = useLoaderData() as Response;

  const courses = Object.keys(data).map((name) => ({
    label: name,
    value: data[name],
  }));

  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTutor, setSelectedTutor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>('');
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingDesc, setMeetingDesc] = useState<string>('');
  const [meetingInfo, setMeetingInfo] = useState<Timeslot>(defaultMeetingInfo);

  const availableTutors = selectedCourse
    ? Object.keys(data[selectedCourse]).map((name) => ({
        label: name,
      }))
    : [];

  const availableDates =
    selectedCourse && selectedTutor && selectedTutor in data[selectedCourse]
      ? new Set(
          data[selectedCourse][selectedTutor].map((timeslot) => {
            const t = timeslot.date_time.split(/\D+/).map((str) => +str);
            return `${t[0]}-${t[1] - 1}-${t[2]}`;
          })
        )
      : new Set();

  const availableTimeslots =
    selectedCourse &&
    selectedTutor &&
    selectedTutor in data[selectedCourse] &&
    selectedDate
      ? data[selectedCourse][selectedTutor]
          .filter((timeslot) => {
            const t = timeslot.date_time.split(/\D+/).map((str) => +str);
            const m = new Date(
              Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
            );
            const date = new Date(selectedDate);
            return checkSameDay(m, date);
          })
          .map((timeslot) => ({
            label: timeslot.readable_time,
          }))
      : [];

  const disableUnavailableDates = (date: DatePickerValue) =>
    !availableDates.has(`${date.$y!}-${date.$M!}-${date.$D!}`);

  const courseSelectChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'input') {
      return;
    } else if (reason === 'clear') {
      setSelectedCourse('');
    } else {
      setSelectedCourse(value);
    }

    setSelectedTutor('');
    setSelectedDate('');
    setSelectedTimeslot('');
  };

  const tutorSelectChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'input') {
      return;
    } else if (reason === 'clear') {
      setSelectedTutor('');
    } else {
      setSelectedTutor(value);
    }

    setSelectedDate('');
    setSelectedTimeslot('');
  };

  const dateSelectChangeHandler = (value: DatePickerValue | null) => {
    if (value) {
      setSelectedDate(value.$d.toISOString());
    } else {
      setSelectedDate('');
    }
    setSelectedTimeslot('');
  };

  const timeslotSelectChangeHandler = (
    _e: React.FormEvent<EventTarget>,
    value: string,
    reason: string
  ) => {
    if (reason === 'input') {
      return;
    } else if (reason === 'clear') {
      setSelectedTimeslot('');
      return;
    } else {
      setSelectedTimeslot(value);
    }

    if (
      selectedCourse.length > 0 &&
      selectedTutor.length > 0 &&
      selectedDate.length > 0 &&
      value.length > 0
    ) {
      const date = new Date(selectedDate);
      const t = value.split(/[^0-9]/);
      date.setHours(+t[0] - 1);
      date.setMinutes(+t[1]);

      setMeetingInfo(
        data[selectedCourse][selectedTutor].find((timeslot) =>
          checkSameTimeslot(new Date(timeslot.date_time), date)
        )!
      );
    }
  };

  return (
    <Form
      method='post'
      className='grid place-content-center bg-[#191919]'>
      <ThemeProvider theme={theme}>
        <Stack
          className='my-24'
          spacing={16}>
          <Stack spacing={6}>
            <Typography
              variant='h4'
              align='center'
              className='mb-3'>
              Schedule a new appointment
            </Typography>
            <Autocomplete
              id='student-course-select'
              options={courses}
              disablePortal
              value={selectedCourse ? { label: selectedCourse } : null}
              onInputChange={courseSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
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
              value={selectedTutor ? { label: selectedTutor } : null}
              onInputChange={tutorSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Tutor'
                />
              )}
            />
          </Stack>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Select an available timeslot
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker<DatePickerValue>
                disablePast={true}
                shouldDisableDate={disableUnavailableDates}
                onChange={dateSelectChangeHandler}
                value={
                  selectedDate.length > 0
                    ? { $d: new Date(selectedDate) }
                    : null
                }
                componentsProps={{ actionBar: { actions: ['today', 'clear'] } }}
              />
            </LocalizationProvider>
            <Autocomplete
              id='timeslot-select'
              options={availableTimeslots}
              disablePortal
              value={selectedTimeslot ? { label: selectedTimeslot } : null}
              onInputChange={timeslotSelectChangeHandler}
              isOptionEqualToValue={getOptionEquality}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Timeslot'
                />
              )}
            />
          </Stack>
          <Stack spacing={6}>
            <Typography
              variant='h5'
              align='center'>
              Fill out details
            </Typography>
            <TextField
              id='meeting-title-field'
              label='Meeting title'
              name='meeting_title'
              required
              value={meetingTitle}
              onChange={(e) => {
                setMeetingTitle(e.target.value);
              }}
            />
            <TextField
              id='meeting-desc-field'
              label='Meeting description'
              name='meeting_desc'
              multiline
              rows={3}
              value={meetingDesc}
              onChange={(e) => {
                setMeetingDesc(e.target.value);
              }}
            />
          </Stack>
          <Button
            variant='contained'
            color='success'
            size='large'
            className='mx-auto'
            disabled={
              !selectedCourse ||
              !selectedTutor ||
              !selectedTimeslot ||
              !meetingTitle
            }
            type='submit'>
            Submit
          </Button>
        </Stack>
        <input
          hidden
          name='meeting_info'
          value={JSON.stringify(meetingInfo)}></input>
      </ThemeProvider>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  // Retrieve logged in user's token
  const token = store.getState().auth.token;
  if (!token) {
    return redirect('/signin');
  }
  const instance = axiosInstance();
  const response = await instance.get('/availability/all');
  if (response.status !== 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }
  const data = response.data as Response;

  // For every subject
  for (const [subjectName, tutorsObject] of Object.entries(data)) {
    // For every tutor
    for (const [tutorName, timeslotsArr] of Object.entries(tutorsObject)) {
      // For every timeslot
      for (let i = 0; i < timeslotsArr.length; i++) {
        const timeslot = data[subjectName][tutorName][i];

        // const readable_date_time = getReadableDateTime(timeslot.date_time);
        const readable_time = getReadableTime(timeslot.date_time);

        // timeslot.readable_date_time = readable_date_time;
        timeslot.readable_time = readable_time;
      }
    }
  }

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userInfo = Object.fromEntries(formData);

  // Retrieve logged in user's token
  const token = store.getState().auth.token;
  if (!token) {
    return redirect('/signin');
  }

  const timeslot = JSON.parse(userInfo.meeting_info as string) as Timeslot;

  const payload = {
    token,
    subject_id: timeslot.subject_id,
    tutor_id: timeslot.tutor_id,
    date_time: timeslot.date_time,
    meeting_title: userInfo.meeting_title,
    meeting_desc: userInfo.meeting_desc,
  };

  const instance = axiosInstance();
  const response = await instance.post('/appointments/create', payload);

  if (response.status != 200) {
    throw json({
      ...response.data,
      status: response.status,
    });
  }

  return redirect('/dashboard');
};

export default MeetingScheduler;
