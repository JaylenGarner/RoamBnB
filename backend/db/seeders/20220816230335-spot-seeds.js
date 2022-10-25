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
    previewImage: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
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
    previewImage: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    avgStarRating: 4.3,
    images: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
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
    previewImage: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    avgStarRating: 4.9,
    images: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
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
