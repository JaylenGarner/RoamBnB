'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
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
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options);
  }
};

// let imageSeeds = [
//   {
//     imageableId: 1,
//     imageableType: 'spot',
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/20de6995-c6aa-402c-b14d-8f2c43cf8962.jpeg?im_w=1200'
//   },
//   {
//     imageableId: 1,
//     imageableType: 'spot',
//     url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/e1ea285e-f417-43e3-80ae-b1d6114c9d90.jpeg?im_w=720'
//   },
// ]

// module.exports = {
//   async up (queryInterface, Sequelize) {

//      try {
//       await Image.bulkCreate(imageSeeds, {
//         validate: true,
//       });
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//      try {
//       await queryInterface.bulkDelete('Images', null, {});
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// };
