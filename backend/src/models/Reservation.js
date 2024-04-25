const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');

/**
 * Represents a reservation.
 * @class
 */
class Reservation extends Model {}

Reservation.init(
  {
    // Unique identifier for the reservation
    reservation_number: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    // Name of the customer making the reservation
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Email of the customer making the reservation
    customer_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validate that the email is in a valid format
      },
    },
    // Number of customers in the reservation
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
    // Date and time of the reservation
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
