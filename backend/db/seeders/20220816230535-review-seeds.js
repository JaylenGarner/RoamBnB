'use strict';

const { Review } = require('../models');

let reviewSeeds = [
  {
    userId: 2,
    spotId: 1,
    review: 'amazing place',
    stars: 5
  },
  {
    userId: 1,
    spotId: 2,
    review: 'great getaway',
    stars: 4
  },
  {
    userId: 3,
    spotId: 3,
    review: 'great getaway',
    stars: 3
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /*
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});*/
     try {
      await Review.bulkCreate(reviewSeeds, {
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
      await queryInterface.bulkDelete('Reviews', null, {});
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
