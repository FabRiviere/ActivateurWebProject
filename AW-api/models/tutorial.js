'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tutorial.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
      
      models.Tutorial.belongsTo(models.Category, { 
        foreignKey: 'CategoryId',       
      });

      models.Tutorial.belongsTo(models.Langage, {
        foreignKey: 'LangageId'
      });
      
      models.Tutorial.hasMany(models.Post);
      
      models.Tutorial.hasMany(models.Comment);
      
      models.Tutorial.hasMany(models.Like);
      
      models.Tutorial.hasMany(models.Media);

      models.Tutorial.hasMany(models.Video);
    }
  };
  Tutorial.init({
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: true },
    LangageId: { type: DataTypes.INTEGER, allowNull: true },
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Tutorial',
  });
  return Tutorial;
};