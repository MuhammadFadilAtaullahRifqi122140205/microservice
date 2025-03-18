const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connect = require('./config/rabbitmq'); // Import RabbitMQ connection
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(4001, () => console.log('✅ Auth Service running on port 4001'));
