const Test = require('../models/Test');

const TestController = {
  deleteUserById: async (req, res) => {
    const { user_id } = req.params;

    try {
      const result = await Test.deleteUserById(user_id);
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
