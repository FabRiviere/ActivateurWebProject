'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Media.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      models.Media.belongsTo(models.Portfolio, {
        foreignKey: "PortfolioId"
      })
      models.Media.belongsTo(models.Tutorial, {
        foreignKey: "TutorialId"
      })
      models.Media.belongsTo(models.Certificat, {
        foreignKey: "CertificatId"
      })
    }
  };
  Media.init({
    mediaName: { type: DataTypes.STRING, allowNull: false },
    mediaFile: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: true },
    PortfolioId: { type: DataTypes.INTEGER, allowNull: true },
    TutorialId: { type: DataTypes.INTEGER, allowNull: true },
    CertificatId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    modelName: 'Media',
    freezeTableName: true,
  });
  return Media;
};