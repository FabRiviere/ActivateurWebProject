'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'PostId'
      })
      
      models.Comment.belongsTo(models.Tutorial, {
        foreignKey: 'TutorialId'
      })
    }
  };
  Comment.init({
    message: { type: DataTypes.STRING, allowNull: false },
    pseudo: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    PostId: { type: DataTypes.INTEGER, allowNull: true },
    TutorialId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Comment',
  });
  return Comment;
};