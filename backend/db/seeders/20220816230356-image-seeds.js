'use strict';

const { Image } = require('../models');

let imageSeeds = [
  {
    imageableId: 1,
    imageableType: 'spot',
    url: 'https://www.pexels.com/photo/residential-house-4469150/'
  },
  {
    imageableId: 1,
    imageableType: 'review',
    url: 'https://www.pexels.com/photo/residential-house-4469163/'
  },
  {
    imageableId: 2,
    imageableType: 'review',
    url: 'https://www.pexels.com/photo/blue-and-white-building-3122830/'
  },
  {
  imageableId: 2,
  imageableType: 'spot',
  url: 'https://www.pexels.com/photo/residential-house-4469150/'
  },
  {
  imageableId: 3,
  imageableType: 'spot',
  url: 'https://www.pexels.com/photo/residential-house-4469163/'
  },
  {
  imageableId: 3,
  imageableType: 'review',
  url: 'https://www.pexels.com/photo/blue-and-white-building-3122830/'
  },
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
     try {
      await Image.bulkCreate(imageSeeds, {
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
      await queryInterface.bulkDelete('Images', null, {});
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
