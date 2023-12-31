const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const app = express();
const http = require('http');
const port = 3000;
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.use('/user', userRoutes); // user routes
app.use('/appointments', appointmentRoutes); // appointment routes
app.use('/availability', availabilityRoutes); // availability routes
app.use('/test', testRoutes); // test routes
app.use('/favorite', favoriteRoutes); // favorite routes
app.use('/upload', uploadRoutes); // upload routes

app.use('/subject', subjectRoutes); // subject routes )
app.get('*', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

const server = http.createServer(app);
// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
