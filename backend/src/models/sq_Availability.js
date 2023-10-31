const { User, Tutor, Subject, Tutor_Subject, Tutor_Availability } = require('./index');

const Availability = {
  getAllTimesByTutorId: async (tutorId) => {
    // Get all times for a tutor
  },
  
  getTutorNameByTutorId: async (tutorId) => {
    // Get tutor name by tutor id
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
