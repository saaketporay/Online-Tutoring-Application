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
      console.log(tutors);
      return res.status(200).json(tutors);
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
      const tutors = await Availability.getAllTutorsBySubjectId(subject_id);
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
      const data = await Availability.getAllAvailabilityInfo();

      const responseData = {};

      // Build responseData object
      for (subject of data) {
        responseData[subject.subject_name] = {};
        for (tutor of subject.Tutors) {
          responseData[subject.subject_name][
            `${tutor.User.first_name} ${tutor.User.last_name}`
          ] = tutor.Tutor_Availabilities.map(
            ({ tutor_id, date_time, duration }) => ({
              tutor_id,
              date_time,
              duration,
              subject_id: subject.subject_id,
            })
          );
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
