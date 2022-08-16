'use strict';

const { Booking } = require('../models');

let bookingSeeds = [
  {
    userId: 1,
    spotId: 1,
    startDate: `11-05-2021`,
    endDate:`11-08-2021`
  },
  {
    userId: 1,
    spotId: 2,
    startDate: `12-05-2023`,
    endDate:`01-15-2024`
  },
  {
    userId: 2,
    spotId: 3,
    startDate: `01-02-2023`,
    endDate:`01-12-2023`
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // use bulkInser('Bookings')
     try {
      await Booking.bulkCreate(bookingSeeds, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    try {
      await queryInterface.bulkDelete('Bookings', null, {});
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
