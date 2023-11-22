const Test = require('../models/Test');

const TestController = {
  deleteTutorByTutorId: async (req, res) => {
    const { tutor_id } = req.params;
    console.log(tutor_id);

    try {
      const result = await Test.deleteTutorByTutorId(tutor_id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
};

module.exports = TestController;
