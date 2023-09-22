const axios = require('axios');

const apiKey = 'ZGYLDfdmTvyrvAyzSoQLAw'; // Replace with your Zoom API Key
const apiSecret = 'llmRt7iCxj85tBF0KgiAiN862YTv62D0'; // Replace with your Zoom API Secret


// Function to schedule a Zoom meeting
const scheduleMeeting = async (meetingData) => {
  try {
    const zoomApiUrl = 'https://api.zoom.us/v2/users/me/meetings';

    const requestBody = {
      topic: meetingData.topic,
      type: 2, // Scheduled meeting
      start_time: meetingData.start_time,
      duration: meetingData.duration,
    };

    const response = await axios.post(zoomApiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}.${apiSecret}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  scheduleMeeting,
};
