const express = require('express');
const cors = require('cors')
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();
const http = require('http');
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());


// Basic route
app.use('/appointments', appointmentRoutes);

app.get('*', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

const server = http.createServer(app);
// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
