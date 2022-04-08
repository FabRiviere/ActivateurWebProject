'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Langage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Langage.belongsTo(models.User, {
        foreignKey: 'UserId'
      })

      models.Langage.hasMany(models.Certificat)

      models.Langage.hasMany(models.Tutorial);
        
      models.Langage.hasMany(models.Portfolio)
    }
  };
  Langage.init({
    langageName: { type: DataTypes.STRING, allowNull: false },
    langageLogo: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Langage',
  });
  return Langage;
};