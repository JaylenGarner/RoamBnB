'use strict';

const { Image } = require('../models');

let imageSeeds = [
  {
    imageableId: 1,
    imageableType: 'spot',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/20de6995-c6aa-402c-b14d-8f2c43cf8962.jpeg?im_w=1200'
  },
  {
    imageableId: 1,
    imageableType: 'spot',
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/e1ea285e-f417-43e3-80ae-b1d6114c9d90.jpeg?im_w=720'
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
