const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');

const AvailabilityController = {
  getAllTimesByTutorId: async (req, res) => {
    const { tutor_Id } = req.params;
    console.log(tutor_Id);

    try {
      const availability = await Availability.getAllTimesByTutorId(tutor_Id);
      console.log(
        availability.map((timeslot) => {
          const date_time = new Date(timeslot.date_time);
          date_time.setSeconds(0);
          date_time.setMilliseconds(0);
          return date_time.toISOString();
        })
      );
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

      const tutorApptsMap = new Map(); // Stores previously calculated available appts for each tutor
      const responseData = {};

      // Build responseData object
      for (subject of data) {
        responseData[subject.subject_name] = {};
        for (tutor of subject.Tutors) {
          if (tutorApptsMap.has(tutor.tutor_id)) {
            responseData[subject.subject_name][
              `${tutor.User.first_name} ${tutor.User.last_name}`
            ] = tutorApptsMap.get(tutor.tutor_id);
            continue;
          }

          const tutorAvailability = (
            await Availability.getAvailabilityByTutorId(tutor.tutor_id)
          ).map((timeslot) => timeslot.date_time);

          const possibly_available_appts = [];
          const cur_sunday = new Date();
          cur_sunday.setDate(cur_sunday.getDate() - cur_sunday.getDay());
          for (let i = 0; i < 4; i++) {
            // Add appts for the next 4 weeks
            for (timeslot of tutorAvailability) {
              const cur_timeslot = new Date(cur_sunday.getTime());
              cur_timeslot.setDate(cur_timeslot.getDate() + timeslot.getDay());
              cur_timeslot.setHours(timeslot.getHours());
              cur_timeslot.setMinutes(timeslot.getMinutes());
              cur_timeslot.setSeconds(0);
              cur_timeslot.setMilliseconds(0);
              possibly_available_appts.push(cur_timeslot.getTime());
            }
            cur_sunday.setDate(cur_sunday.getDate() + 7);
          }

          const scheduled_appts = (
            await Appointment.getAllApptsByTutorId(tutor.tutor_id)
          ).map((timeslot) => {
            const date_time = new Date(timeslot.date_time);
            date_time.setSeconds(0);
            date_time.setMilliseconds(0);
            return date_time.getTime();
          });

          const available_appts = Array.from(
            setMinus(possibly_available_appts, scheduled_appts)
          ).map((date_time) => ({
            date_time: new Date(date_time).toISOString(),
            tutor_id: tutor.tutor_id,
            subject_id: subject.subject_id,
          }));

          tutorApptsMap.set(tutor.tutor_id, available_appts);

          responseData[subject.subject_name][
            `${tutor.User.first_name} ${tutor.User.last_name}`
          ] = available_appts;
        }
      }

      // console.log(responseData);
      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
};

// Fast set difference between two input arrays A and B
function* setMinus(A, B) {
  const setA = new Set(A);
  const setB = new Set(B);

  for (const v of setB.values()) {
    if (!setA.delete(v)) {
      yield v;
    }
  }

  for (const v of setA.values()) {
    yield v;
  }
}

module.exports = AvailabilityController;
