const Availability = require('../models/Availability');

const AvailabilityController = {
  getAllTimesByTutorId: async (req, res) => {
    const { tutor_Id } = req.params;
    console.log(tutor_Id);

    try {
      const availability = await Availability.getAllTimesByTutorId(tutor_Id);
      console.log(availability);
      return res.status(200).json(availability);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Availability.getAllSubjects();
      console.log(subjects);
      return res.status(200).json(subjects);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  getAllTutors: async (req, res) => {
    try {
      const tutors = await Availability.getAllTutors();

      const responseData = {};

      for (tutor of tutors) {
        responseData[`${tutor.User.first_name} ${tutor.User.last_name}`] = {
          email: tutor.User.email,
          about_me: tutor.about_me,
          profile_picture: tutor.profile_picture,
          total_tutoring_hours: tutor.User.total_tutoring_hours,
        };
      }

      console.log(responseData);
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  getAllTutorsBySubjectId: async (req, res) => {
    const { subject_id } = req.params;
    console.log(subject_id);

    try {
      const tutors = (await Availability.getAllTutorsBySubjectId(subject_id))
        .Tutors;

      const responseData = {};

      for (tutor of tutors) {
        responseData[`${tutor.User.first_name} ${tutor.User.last_name}`] = {
          email: tutor.User.email,
          about_me: tutor.about_me,
          profile_picture: tutor.profile_picture,
          total_tutoring_hours: tutor.User.total_tutoring_hours,
        };
      }

      console.log(responseData);
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  getAllAvailabilityInfo: async (req, res) => {
    try {
      const data = await Availability.getAllAvailabilityInfo();

      const responseData = {};

      // Build responseData object
      for (subject of data) {
        responseData[subject.subject_name] = {};
        for (tutor of subject.Tutors) {
          available_appts = [];
          for ({
            tutor_id,
            date_time,
            duration,
          } of tutor.Tutor_Availabilities) {
            appt = { tutor_id, date_time, duration };
            const start = date_time;
            const end = new Date(start.getTime());
            end.setMinutes(end.getMinutes() + duration);
            start.setHours(start.getHours() - 1); // Subtract 1 hour to include appts that start before this appt but finish during/after it

            possible_overlaps =
              await Availability.getAllOverlappingAppointments(
                tutor_id,
                start,
                end
              );

            start.setHours(start.getHours() + 1); // Restore original start datetime

            foundOverlap = false;
            for ({ date_time2, duration2 } of possible_overlaps) {
              const start2 = date_time2;
              const end2 = new Date(start2.getTime());
              end2.setMinutes(end2.getMinutes() + duration2);
              if (
                (start < start2 && start2 < end) ||
                (start < end2 && end2 < end)
              ) {
                foundOverlap = true;
                break;
              }
            }

            if (!foundOverlap) {
              available_appts.push({
                ...appt,
                subject_id: subject.subject_id,
              });
            }
          }

          responseData[subject.subject_name][
            `${tutor.User.first_name} ${tutor.User.last_name}`
          ] = available_appts;
        }
      }

      console.log(responseData);
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = AvailabilityController;
