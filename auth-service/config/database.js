const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('auth_service', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to MySQL'))
  .catch((err) => console.error('❌ MySQL Connection Error:', err));

module.exports = sequelize;
