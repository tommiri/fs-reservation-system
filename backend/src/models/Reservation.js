const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

/**
 * Represents a reservation.
 * @class
 */
class Reservation extends Model {}

Reservation.init(
  {
    reservation_number: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customer_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: 8,
          msg: 'For reservations larger than 8 people please give us a call!',
        },
      },
    },
    reservation_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
  }
);

module.exports = Reservation;
