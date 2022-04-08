'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Video.belongsTo(models.User, {
        foreignKey: 'UserId'
      })

      models.Video.belongsTo(models.Portfolio, {
        foreignKey: 'PortfolioId'        
      })

      models.Video.belongsTo(models.Tutorial, {
         foreignKey: 'TutorialId'
      })
    }
  };
  Video.init({
    title: { type: DataTypes.STRING, allowNull: true },
    poster: { type: DataTypes.STRING, allowNull: true },
    duration: { type: DataTypes.STRING, allowNull: true },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    PortfolioId: { type: DataTypes.INTEGER, allowNull: true },
    TutorialId: { type: DataTypes.INTEGER, allowNull: true },
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Video',
  });
  return Video;
};