'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      username: Sequelize.STRING(64),
      password: Sequelize.STRING(60),
      privateKey: Sequelize.STRING,
      address: Sequelize.STRING,
      createdAt: Sequelize.DATE(3),
      updatedAt: Sequelize.DATE(3),
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};