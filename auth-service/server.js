const express = require('express');
const { startSubscribe } = require('./sync/userService');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

startSubscribe().catch(console.error);

app.listen(4001, () => console.log('✅ Auth Service running on port 4001'));
