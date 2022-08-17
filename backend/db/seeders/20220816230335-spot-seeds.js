'use strict';

const { Spot } = require('../models');

const rentalListings = [
  {
    ownerId: 1,
    address: '735 abby rd',
    city: 'Norwich',
    country: 'United States',
    state: 'rhode island',
    lat: 41.5243,
    lng: 72.0759,
    name: 'apartment',
    description: 'long term apartment rental here in Norwich',
    price: 60,
    previewImage: 'url-filler',
    avgStarRating: 3.5,
    images: 'https://www.pexels.com/photo/house-lights-turned-on-106399/'
  },
  {
    ownerId: 2,
    address: '10 marrow ln',
    city: 'Moosup',
    state: 'connecticut',
    country: 'United States',
    lat: 68.4565,
    lng: 49.0984,
    name: 'Lake House',
    description: 'Lake house nightly rental',
    price: 250,
    previewImage: 'url-filler',
    avgStarRating: 4.3,
    images: 'https://www.pexels.com/photo/photograph-of-a-white-and-green-house-9472589/'
  },
  {
    ownerId: 1,
    address: '1 sandy rd',
    city: 'Plainfield',
    state: 'maine',
    country: 'United States',
    lat: 12.3000,
    lng: 42.0284,
    name: 'Beach house',
    description: 'Beach house nightly rental',
    price: 400,
    previewImage: 'url-filler',
    avgStarRating: 4.9,
    images: 'https://www.pexels.com/photo/trees-behind-a-house-8031875/'
  }
];

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
      await Spot.bulkCreate(rentalListings, {
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
      await queryInterface.bulkDelete('Spots', null, {});
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
