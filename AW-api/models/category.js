'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Category.belongsTo(models.User, {
        foreignKey: 'UserId'
      })

      models.Category.hasMany(models.Certificat)

      models.Category.hasMany(models.Tutorial)

      models.Category.hasMany(models.Portfolio)
      
      models.Category.hasMany(models.Media)
    }
  };
  Category.init({
    name: { type: DataTypes.STRING, allowNull: false },
    logo: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Category',
  });
  return Category;
};