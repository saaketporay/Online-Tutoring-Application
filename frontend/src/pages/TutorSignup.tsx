import Box from '@mui/material/Box';
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

const DUMMY_COURSES = [{ label: 'CS 1336' }, { label: 'CS 1337' }];

// TODO: Create theme and add theme providers

const TutorSignup = () => {
  return (
    <Box className='grid place-content-center bg-[#191919]'>
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
              defaultValue='no'
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
        <Stack spacing={6}>
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
            renderInput={(params) => (
              <TextField
                {...params}
                label='Course'
              />
            )}
          />{' '}
        </Stack>
        {/* TODO: Add available times grid */}
        <Button
          variant='contained'
          color='success'
          size='large'
          className='mx-auto'>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default TutorSignup;
