const { User, Tutor, Subject, Tutor_Subject, Tutor_Availability } = require('./index');

const Availability = {

  // not yet tested
  getAllTimesByTutorId: async (tutorId) => {
    // Get all times for a tutor by tutor id
    try {
      const times = await Tutor_Availability.findAll({
        where: {
          tutor_id: tutorId
        }
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
        include: [{
          model: User,
          attributes: ['first_name', 'last_name'],
        }]
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
      const tutors = await Tutor.findAll();
      return tutors;
    } catch (err) {
      return err;
    }
  },

  getAllTutorsBySubjectId: async (subjectId) => {
    try {
      const tutors = await Tutor_Subject.findAll({
        where: {
          subject_id: subjectId
        },
        include: [Tutor]
      });
      return tutors.map(tutorSubject => tutorSubject.tutor); // Return only the tutors
    } catch (err) {
      return err;
    }
  }
};

module.exports = Availability;
