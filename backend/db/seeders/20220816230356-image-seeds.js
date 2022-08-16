'use strict';

const { Image } = require('../models');

let imageSeeds = [
  {
    imageableId: 2,
    imageableType: 'spot',
    url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.gettyimages.com%2Fphotos%2Fmodern-custom-suburban-home-exterior-picture-id1255835529%3Fs%3D612x612&imgrefurl=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fhouse&tbnid=vLuneVt-2PeZSM&vet=12ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMyg6egUIARDJAQ..i&docid=bCigr3d4njUkyM&w=612&h=458&q=house%20images&ved=2ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMyg6egUIARDJAQ'
  },
  {
    imageableId: 1,
    imageableType: 'review',
    url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.livemint.com%2Fimg%2F2019%2F04%2F16%2F600x338%2FKerala_1555430371601.jpg&imgrefurl=https%3A%2F%2Fwww.livemint.com%2Fmoney%2Fpersonal-finance%2Fkerala-s-vacant-houses-are-high-on-nostalgia-not-on-returns-1555430125374.html&tbnid=Q6I9nUufnkaq5M&vet=12ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMyg0egUIARC8AQ..i&docid=UDI4IYVjh1JrIM&w=600&h=337&q=house%20images&ved=2ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMyg0egUIARC8AQ'
  },
  {
    imageableId: 2,
    imageableType: 'review',
    url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbor.forbes.com%2Fthumbor%2Ffit-in%2Fx%2Fhttps%3A%2F%2Fwww.forbes.com%2Fadvisor%2Fwp-content%2Fuploads%2F2021%2F08%2Fdownload-7.jpg&imgrefurl=https%3A%2F%2Fwww.forbes.com%2Fadvisor%2Fhome-improvement%2Ftypes-of-house-styles%2F&tbnid=yD-uOCHeW9AdCM&vet=12ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygcegUIARD6Ag..i&docid=xCIuxCOW5lAuIM&w=959&h=540&q=house%20images&ved=2ahUKEwiJpN3kvMz5AhU4sHIEHQ2sAtoQMygcegUIARD6Ag'
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
