import Box from '@mui/material/Box';
import Header from '../components/Header'
import SvgIcon from '@mui/material/SvgIcon';
import ErrorIcon from '../assets/icons/404-Icon.svg';
import Typography from '@mui/material/Typography';

function ErrorPage() {
  return (
    <>
      <Header />
      <Box className="grid justify-items-center bg-[#191919]">
        <SvgIcon viewBox="0 0 160 160" className="w-[160px] h-[160px] mt-40">
          <ErrorIcon />
        </SvgIcon>
        <Typography variant="h4" className="my-6">Page not found!</Typography>
        <Typography variant="h6">Sorry, we couldn't find what you were looking for.</Typography>
      </Box>
    </>
  )
}

export default ErrorPage;
