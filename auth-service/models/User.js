const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ipAddress: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
