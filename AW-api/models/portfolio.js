'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Portfolio.belongsTo(models.User, {
        foreignKey: 'UserId'
      })

      models.Portfolio.belongsTo(models.Category, {
        foreignKey: 'CategoryId',        
      })
      
      models.Portfolio.belongsTo(models.Langage, {        
        foreignKey: 'LangageId',        
      })

      models.Portfolio.hasMany(models.Video)

      models.Portfolio.hasMany(models.Certificat)
      
      models.Portfolio.hasMany(models.Media)
    }
  };
  Portfolio.init({
    projet: { type: DataTypes.STRING, allowNull: false },
    contenu: { type: DataTypes.STRING, allowNull: true },
    videoProjet: { type: DataTypes.STRING, allowNull: true },
    imageProjet: { type: DataTypes.STRING, allowNull: true },
    urlProjet: { type: DataTypes.STRING, allowNull: true },
    githubUrl: { type: DataTypes.STRING, allowNull: true },
    youtubeUrl: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: true },
    LangageId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Portfolio',

  });
  return Portfolio;
};