const Availability = require('../models/Availability');

const AvailabilityController = {
  getTimesByTutorId: async (req, res) => {
    const { tutor_Id } = req.params;

    try {
      const availability = await Availability.getAllTimesByTutorId(tutor_Id);
      console.log(availability[0]);
      return res.status(200).json(availability[0]);
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
      console.log(subjects[0]);
      return res.status(200).json(subjects[0]);
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
      return res.status(200).json(tutors[0]);
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
      const subjects = getAllSubjects();
      subjects.forEach(async (subject) => {
        console.log('subject:', subject.subject_name);
        const tutors = await Availability.getAllTutorsBySubjectId(
          subject.subject_id
        );
        responseData[subject.subject_name] = {};
        tutors.forEach(async (tutor) => {
          console.log('tutor: ', tutor.tutor_name);
          const tutorInfo = await Availability.getTutorNameByTutorId(
            tutor.tutor_id
          );
          const tutorTimes = await Availability.getAllTimesByTutorId(
            tutor.tutor_id
          );
          responseData[subject.toString()][
            `${tutorInfo.first_name} ${tutorInfo.last_name}`
          ] = tutorTimes;
        });
      });
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
