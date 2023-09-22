import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [oauthToken, setOauthToken] = useState<string>(null);

  const handleAuthorize = () => {
    // Redirect the user to Zoom's OAuth login page
    axios.get('/auth/zoom').then(response => {
      setOauthToken(response.data.oauthToken);
    });
  };

  const handleScheduleMeeting = () => {
    // Schedule a Zoom meeting using the stored OAuth token
    const meetingData = {
      topic: 'My meeting',
      start_time: '2023-09-12T12:00:00',
      duration: 30,
    };

    axios.post('/schedule-meeting', meetingData, {
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
      },
    }).then(response => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <button onClick={handleAuthorize}>Authorize</button>
      <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
    </div>
  );
};

export default App;
