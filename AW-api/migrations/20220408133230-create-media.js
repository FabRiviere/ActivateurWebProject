'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mediaName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mediaFile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      PortfolioId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      TutorialId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      CertificatId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Media');
  }
};