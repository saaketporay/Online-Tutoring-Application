import Box from '@mui/material/Box';
import Header from '../components/Header';
import SvgIcon from '@mui/material/SvgIcon';
import ErrorIcon from '../assets/icons/404-Icon.svg';
import CriminalIcon from '../assets/icons/Criminal.svg';
import Typography from '@mui/material/Typography';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError() as any;
  let status;
  let errorMessage;
  let errorTitle;
  console.log('error', error);
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    if (error.status == 404) {
      status = 404;
    } else {
      status = error.data?.status;
      errorMessage = error.data?.message || error.statusText;
    }
  } else if (error.response.status === 403) {
    errorTitle = 'Please enter a valid password';
    errorMessage = error.response.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <>
      <Header />
      <Box className='grid justify-items-center bg-[#191919]'>
        {status == 404 ? (
          <>
            <SvgIcon
              viewBox='0 0 160 160'
              className='w-[160px] h-[160px] mt-40'>
              <ErrorIcon />
            </SvgIcon>
            <Typography
              variant='h4'
              className='my-6'>
              404 Page Not Found!
            </Typography>
            <Typography variant='h6'>
              Sorry, we couldn't find what you were looking for.
            </Typography>
          </>
        ) : status == 451 ? (
          <>
            <SvgIcon
              viewBox='0 0 175 175'
              className='w-[175px] h-[175px] mt-40'>
              <CriminalIcon />
            </SvgIcon>
            <Typography
              variant='h6'
              className='mt-6'>
              {errorMessage}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant='h4'
              className='mt-40'>
              {errorTitle || 'An unexpected error occured'}
            </Typography>
            <Typography
              variant='h6'
              className='mt-6'>
              {errorMessage}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default ErrorPage;
