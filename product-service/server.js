const express = require('express');
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

app.use('/api/products', require('./routes/productRoutes'));

app.listen(4003, () => console.log('✅ User Service running on port 4003'));
