const TutorAvailability = require('../models/Tutor');

const AvailabilityController = {
    getAvailabilityByTutorId: async (req, res) => {
      const { tutor_Id } = req.params;
  
      try {
        const availability = await TutorAvailability.getAllByTutorId(tutor_Id);
        return res.json({ data: availability });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    },
  };
  

module.exports = AvailabilityController;

