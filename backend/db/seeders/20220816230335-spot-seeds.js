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
    images: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.adsttc.com%2Fmedia%2Fimages%2F5ecd%2Fd4ac%2Fb357%2F65c6%2F7300%2F009d%2Flarge_jpg%2F02C.jpg%3F1590547607&imgrefurl=https%3A%2F%2Fwww.archdaily.com%2F940445%2Fab-house-bwa&tbnid=zZX_6N9gJAnIFM&vet=12ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygQegUIARDaAg..i&docid=ycr1f-MM1FMK6M&w=2000&h=1333&q=house%20images&ved=2ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygQegUIARDaAg'
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
    images: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F186077%2Fpexels-photo-186077.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-binyamin-mellish-186077.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fhouse%2F&tbnid=GAWtfGsbHL7D3M&vet=12ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygJegUIARDJAg..i&docid=w_edFuvJNI2ApM&w=3352&h=2286&itg=1&q=house%20images&ved=2ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygJegUIARDJAg'
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
    images: 'https://unsplash.com/images/things/house'
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
