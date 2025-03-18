const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'New User',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Profile;
