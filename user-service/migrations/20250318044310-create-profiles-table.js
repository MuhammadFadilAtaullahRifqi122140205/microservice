'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ipAddress: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      browser: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
  },
};
