'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Tutorial)
      
      User.hasMany(models.Portfolio)
      
      User.hasMany(models.Category)
      
      User.hasMany(models.Video)
      
      User.hasMany(models.Post)
      
      User.hasMany(models.Certificat)
      
      User.hasMany(models.Like)
      
      User.hasMany(models.Comment)
      
      User.hasMany(models.Langage)
      
      User.hasMany(models.Media)
    }
  };
  User.init({
    pseudo: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.STRING, allowNull: true },
    admin: { type: DataTypes.BOOLEAN, allowNull: false },
    firstname: { type: DataTypes.STRING, allowNull: true },
    lastname: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    codePostal: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};