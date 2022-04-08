'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Certificat.belongsTo(models.User, {
        foreignKey: 'UserId'
      })

      models.Certificat.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })

      models.Certificat.belongsTo(models.Langage, {
        foreignKey: 'LangageId'
      })
      
      models.Certificat.belongsTo(models.Portfolio, {
        foreignKey: 'PortfolioId'        
      })

      models.Certificat.hasMany(models.Media)
    }
  };
  Certificat.init({
    label: { type: DataTypes.STRING, allowNull: true },
    organisme: { type: DataTypes.STRING, allowNull: true },
    fichierUrl: { type: DataTypes.STRING, allowNull: true },
    imageCert: { type: DataTypes.STRING, allowNull: true },
    nbreHeures: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: true },
    LangageId: { type: DataTypes.INTEGER, allowNull: true },
    PortfolioId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Certificat',
  });
  return Certificat;
};