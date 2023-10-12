import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon';
import SuccessIcon from '../assets/icons/Success-Icon.svg'

function FormSuccess() {
  return (
    <>
      <Box className="grid place-content-center bg-[#191919]">
        <SvgIcon
          viewBox='0 0 169 169'
          className="justify-self-center mt-40"
          sx={{
            fontSize: 150
          }}>
          <SuccessIcon />
        </SvgIcon>
        <Typography variant="h4" className="mt-16">
          Form successfully submitted
        </Typography>
      </Box>
    </>
  )
}

export default FormSuccess;
