const {
  User,
  Tutor,
  Subject,
  Tutor_Subject,
  Tutor_Availability,
  Scheduled_Appointments,
} = require('./index');

const Availability = {
  // not yet tested
  getAllTimesByTutorId: async (tutorId) => {
    // Get all times for a tutor by tutor id
    try {
      const times = await Tutor_Availability.findAll({
        where: {
          tutor_id: tutorId,
        },
      });
      return times;
    } catch (err) {
      return err;
    }
  },
  // not yet tested
  getTutorNameByTutorId: async (tutorId) => {
    // Get tutor name by tutor id
    try {
      const tutor = await Tutor.findOne({
        where: { tutor_id: tutorId },
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name'],
          },
        ],
      });
      if (tutor && tutor.User) {
        console.log(tutor.User.first_name, tutor.User.last_name);
        return `${tutor.User.first_name} ${tutor.User.last_name}`;
      }
      return null;
    } catch (err) {
      console.error('Error fetching tutor name:', err);
      throw err;
    }
  },

  getAllSubjects: async () => {
    try {
      const subjects = await Subject.findAll();
      return subjects;
    } catch (err) {
      return err;
    }
  },

  getAllTutors: async () => {
    try {
      const tutors = await Tutor.findAll({ include: User });
      return tutors;
    } catch (err) {
      return err;
    }
  },

  getAllTutorsBySubjectId: async (subjectId) => {
    try {
      const tutors = await Subject.findOne({
        where: {
          subject_id: subjectId,
        },
        include: [
          {
            model: Tutor,
            include: [{ model: User }],
          },
        ],
      });
      return tutors;
    } catch (err) {
      return err;
    }
  },

  getAvailabilityByTutorId: async (tutor_id) => {
    try {
      const data = await Tutor_Availability.findAll({
        where: {
          tutor_id: tutor_id,
        },
      });
      return data;
    } catch (err) {
      return err;
    }
  },

  getAllAvailabilityInfo: async () => {
    try {
      const data = await Subject.findAll({
        include: [
          {
            model: Tutor,
            include: [{ model: User }],
          },
        ],
      });
      return data;
    } catch (err) {
      return err;
    }
  },
};

module.exports = Availability;
