'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      });

      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId'
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      });

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      });
    }
  }

  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.NUMBER,
    lng: DataTypes.NUMBER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    previewImage: DataTypes.STRING,
    avgStarRating: DataTypes.DECIMAL,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
