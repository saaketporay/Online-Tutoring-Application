import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { modalStyle } from "../utils/theme";
import {
  ActionFunction,
  Form,
  redirect,
  // json,
  useOutletContext,
  useParams,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { axiosInstance } from "../utils/axios";
import { userProps } from "../pages/UserDashboard";

type tutorSubjects = [{
  Tutors: [{
    Tutor_Subjects: {
      subject_id: number,
      tutor_id: number,
      tutor_subject_id: number,
    },
    about_me: string,
    profile_picture: string,
    tutor_id: number,
    user_id: number,
  }],
  subject_id: number,
  subject_name: number,
}]

const FavoriteTutorModal = () => {
  const loaderData = useLoaderData() as tutorSubjects;
  const subjects = loaderData.map((tutor_subject) => tutor_subject.subject_name)
  const showModal = useAppSelector((state) => state.modal.showModal);
  const { handleCloseModal, userInfo } = useOutletContext() as any;
  const { tutorId } = useParams();

  const { favorite_tutors } = userInfo as userProps;
  const tutor = favorite_tutors.find((tutor) => tutor.Tutor.tutor_id == +tutorId!)
  return (
    <>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-label="favorite-tutor-modal"
        aria-describedby="favorite-tutor-description"
      >
        <Box sx={modalStyle}>
          <Form method="post">
            <Stack direction={'column'} spacing={2}>
              <Stack
                direction={'row'}
                useFlexGap
              >
                <Avatar
                  variant='square'
                  sx={{
                    height: 75,
                    width: 75
                  }}
                />
                <Stack
                  direction={'column'}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      marginLeft: '20px',
                    }}
                  >
                    {tutor?.Tutor.User.first_name} {tutor?.Tutor.User.last_name}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      marginLeft: '20px',
                    }}
                  >
                    {tutor?.Tutor.User.email}
                  </Typography>
                </Stack>
              </Stack>
              {subjects && subjects.length > 0 ?
                <>
                  <Typography
                    variant='h6'
                  >
                    Subjects:
                  </Typography>
                  {subjects.join(', ')}
                </>
              :
                <>
                  <Typography
                    variant='h6'
                  >
                    Tutor has no subjects...
                  </Typography>
                </>
              }
              <Button
                type='submit'
                variant='outlined'
                color='warning'
              >
                Remove tutor from favorite's list
              </Button>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default FavoriteTutorModal;

export const favoriteTutorLoader: LoaderFunction = async ({ params }) => {
  const instance = axiosInstance();
  const { tutorId } = params;
  const response = await instance.get(`/subject/${tutorId}`);
  return response.data;
}

export const favoriteTutorAction: ActionFunction = async ({ request, params }) => {
  const instance = axiosInstance();
  const { tutorId } = params;
  switch (request.method) {
    case "POST": {
      await instance.post('/favorite/add', {
        tutor_id: tutorId
      });
      break
    }
    case "DELETE": {
      await instance.delete('/favorite/remove', {
        data: {
          tutor_id: tutorId,
        }
      });
      break
    }
  }
  return redirect('/dashboard');
}
