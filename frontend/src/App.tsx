import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [meetingLink, setMeetingLink] = useState(null);

  useEffect(() => {
    // Function to initiate the Zoom OAuth flow
    const initiateZoomOAuth = async () => {
      try {
        const authResponse = await axios.get('http://localhost:3000/zoom/auth'); // Replace with your backend URL
        window.location.href = authResponse.data.redirectUrl;
      } catch (error) {
        console.error('Error initiating Zoom OAuth:', error);
      }
    };

    initiateZoomOAuth();
  }, []);

  return (
    <div className="App">
      <h1>Zoom OAuth Authentication</h1>
      {meetingLink ? (
        <div>
          <p>Zoom Meeting Link: {meetingLink}</p>
        </div>
      ) : (
        <p>Redirecting to Zoom for authentication...</p>
      )}
    </div>
  );
}

export default App;
