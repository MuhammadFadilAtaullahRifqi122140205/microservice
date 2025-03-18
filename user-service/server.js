const express = require('express');
const { startConsumer } = require('./sync/authService');

const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/users', require('./routes/userRoutes'));

startConsumer().catch(console.error);

app.listen(4002, () => console.log('✅ User Service running on port 4002'));
