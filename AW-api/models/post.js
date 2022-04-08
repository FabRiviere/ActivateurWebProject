'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      
      models.Post.belongsTo(models.Tutorial, {
        foreignKey: 'TutorialId'
      })
      
      models.Post.hasMany(models.Comment)
      
      models.Post.hasMany(models.Like)
    }
  };
  Post.init({
    message: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    TutorialId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Post',
  });
  return Post;
};