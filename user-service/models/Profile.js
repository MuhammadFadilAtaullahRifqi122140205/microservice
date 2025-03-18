const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const Profile = sequelize.define('profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  browser: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Profile;
