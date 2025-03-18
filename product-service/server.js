const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));

app.listen(4003, () => console.log('✅ User Service running on port 4003'));
