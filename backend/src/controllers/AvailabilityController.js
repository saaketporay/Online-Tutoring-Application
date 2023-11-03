const Availability = require('../models/Availability');

const AvailabilityController = {
  getAllTimesByTutorId: async (req, res) => {
    const { tutor_Id } = req.params;

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
      console.log(tutors);
      return res.status(200).json(tutors);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  getAllAvailabilityInfo: async (req, res) => {
    try {
      // Build responseData object
      const responseData = {};
      const subjects = await Availability.getAllSubjects();

      // console.log('subjects:', subjects);
      for (subject of subjects) {
        console.log('subject:', subject);
        const tutors = await Availability.getAllTutorsBySubjectId(
          subject.subject_id
        );
        responseData[subject.subject_name] = {};

        // console.log('tutors:', tutors);
        if (tutors.length === 0) {
          continue;
        }
        for (tutor of tutors) {
          // console.log('tutor:', tutor);
          const tutorInfo = await Availability.getTutorNameByTutorId(
            tutor.tutor_id
          );
          const tutorTimes = await Availability.getAllTimesByTutorId(
            tutor.tutor_id
          );
          responseData[subject.subject_name][
            `${tutorInfo.first_name} ${tutorInfo.last_name}`
          ] = {
            tutor_id: tutor_id,
            timeslots: tutorTimes.length === 0 ? [] : tutorTimes,
          };
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
