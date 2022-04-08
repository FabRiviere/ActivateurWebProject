'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Portfolio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      LangageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      projet: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenu: {
        type: Sequelize.STRING,
        allowNull: true
      },
      videoProjet: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageProjet: {
        type: Sequelize.STRING,
        allowNull: true
      },
      urlProjet: {
        type: Sequelize.STRING,
        allowNull: true
      },
      githubUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      youtubeUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Portfolio');
  }
};