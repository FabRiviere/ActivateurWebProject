'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Certificat', {
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
      CertificatId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      PortfolioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organisme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fichierUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imageCert: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nbreHeures: {
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
    await queryInterface.dropTable('Certificat');
  }
};