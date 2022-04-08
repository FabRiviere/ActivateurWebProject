'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      
      models.Like.belongsTo(models.Post, {
        foreignKey: 'PostId'
      })
      
      models.Like.belongsTo(models.Tutorial, {
        foreignKey: 'TutorialId'
      })
    }
  };
  Like.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    PostId: { type: DataTypes.INTEGER, allowNull: true },
    TutorialId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Like',
  });
  return Like;
};