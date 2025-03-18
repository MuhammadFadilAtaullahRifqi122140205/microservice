const express = require('express');
const { startSubscribe } = require('./sync/userService');
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

app.use('/api/auth', require('./routes/authRoutes'));

startSubscribe().catch(console.error);

app.listen(4001, () => console.log('✅ Auth Service running on port 4001'));
