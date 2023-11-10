import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { modalStyle } from "../utils/theme";
import {
  ActionFunction,
  Form,
  redirect,
  json,
  useOutletContext,
} from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const FavoriteTutorModal = () => {
  const handleCloseModal = useOutletContext() as VoidFunction;
  const showModal = useAppSelector((state) => state.modal.showModal);

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-label="favorite-tutor-modal"
        aria-describedby="favorite-tutor-description"
      >
        <Box sx={modalStyle}>
          <Form method="delete">
            <Stack direction={'column'}>
              <Button
                type='submit'
                variant='outlined'
                color='warning'
              >
                Remove from favorites
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default FavoriteTutorModal;

export const favoriteTutorAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const tutorInfo = Object.fromEntries(data);
  return redirect("/dashboard");
};
