'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
            ownerId: 1,
            address: '735 Jared Sparks Rd',
            city: 'Willington',
            country: 'United States',
            state: 'Connecticut',
            name: 'Treehouse',
            description: 'Heavenly Treehouse in Countryside w/ Farm Animals',
            price: 201,
            previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/3e9c311d-6aa6-457b-a2f3-9c4ae47ae9df.jpeg?im_w=1200',
            avgStarRating: 5,
            // images: 'https://www.pexels.com/photo/house-lights-turned-on-106399/'
          },
          {
            ownerId: 1,
            address: '10 Vermont Rte 100',
            city: 'Waterbury',
            state: 'Vermont',
            country: 'United States',
            name: 'Treehouse',
            description: 'Moose Meadow Lodge - Treehouse',
            price: 650,
            previewImage: 'https://a0.muscache.com/im/pictures/85522965/de7d0eb2_original.jpg?im_w=1200',
            avgStarRating: 5,
            // images: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
          },
          {
            ownerId: 2,
            address: '3 11th Ave',
            city: 'New York',
            state: 'New York',
            country: 'United States',
            name: 'Entire rental unit',
            description: "Amazing 2bed's / stunning views to Empire State",
            price: 799,
            previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-683194252577702880/original/c3cc9e96-c34d-42db-9ffe-c5d2b0738f7e.jpeg?im_w=1200',
            avgStarRating: 5,
            // images: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
          },
          {
            ownerId: 2,
            address: '118 Swamp College Rd',
            city: 'Prince Edward',
            state: 'Ontario',
            country: 'Canada',
            name: 'Camper/RV',
            description: "Airstream Living in Prince Edward County",
            price: 102,
            previewImage: 'https://a0.muscache.com/im/pictures/7c8aa9cb-3471-4ebd-bf49-502e693c79b1.jpg?im_w=1200',
            avgStarRating: 5,
          },
          {
            ownerId: 3,
            address: '52 Blue Heron Dr',
            city: 'Averill Park',
            state: 'New York',
            country: 'United States',
            name: 'Entire home',
            description: "Cozy, peaceful lake house near Jiminy Peak.",
            price: 200,
            previewImage: 'https://a0.muscache.com/im/pictures/1c305844-e42a-4f0c-a381-6b6cf19bcbd0.jpg?im_w=1200',
            avgStarRating: 5,
          },
          {
            ownerId: 3,
            address: '4 North Dr',
            city: 'East Lyme',
            state: 'Connecticut',
            country: 'United States',
            name: 'Entire home',
            description: "Beachfront Paradise",
            price: 295,
            previewImage: 'https://a0.muscache.com/im/pictures/d6623150-0f90-4651-b48d-9c57d4554bb3.jpg?im_w=1200',
            avgStarRating: 5,
          }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options);
  }
};


// const rentalListings = [
//   {
//     ownerId: 1,
//     address: '735 Jared Sparks Rd',
//     city: 'Willington',
//     country: 'United States',
//     state: 'Connecticut',
//     name: 'Treehouse',
//     description: 'Heavenly Treehouse in Countryside w/ Farm Animals',
//     price: 201,
//     previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/3e9c311d-6aa6-457b-a2f3-9c4ae47ae9df.jpeg?im_w=1200',
//     avgStarRating: 5,
//     // images: 'https://www.pexels.com/photo/house-lights-turned-on-106399/'
//   },
//   {
//     ownerId: 1,
//     address: '10 Vermont Rte 100',
//     city: 'Waterbury',
//     state: 'Vermont',
//     country: 'United States',
//     name: 'Treehouse',
//     description: 'Moose Meadow Lodge - Treehouse',
//     price: 650,
//     previewImage: 'https://a0.muscache.com/im/pictures/85522965/de7d0eb2_original.jpg?im_w=1200',
//     avgStarRating: 5,
//     // images: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
//   },
//   {
//     ownerId: 2,
//     address: '3 11th Ave',
//     city: 'New York',
//     state: 'New York',
//     country: 'United States',
//     name: 'Entire rental unit',
//     description: "Amazing 2bed's / stunning views to Empire State",
//     price: 799,
//     previewImage: 'https://a0.muscache.com/im/pictures/miso/Hosting-683194252577702880/original/c3cc9e96-c34d-42db-9ffe-c5d2b0738f7e.jpeg?im_w=1200',
//     avgStarRating: 5,
//     // images: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
//   },
//   {
//     ownerId: 2,
//     address: '118 Swamp College Rd',
//     city: 'Prince Edward',
//     state: 'Ontario',
//     country: 'Canada',
//     name: 'Camper/RV',
//     description: "Airstream Living in Prince Edward County",
//     price: 102,
//     previewImage: 'https://a0.muscache.com/im/pictures/7c8aa9cb-3471-4ebd-bf49-502e693c79b1.jpg?im_w=1200',
//     avgStarRating: 5,
//   },
//   {
//     ownerId: 3,
//     address: '52 Blue Heron Dr',
//     city: 'Averill Park',
//     state: 'New York',
//     country: 'United States',
//     name: 'Entire home',
//     description: "Cozy, peaceful lake house near Jiminy Peak.",
//     price: 200,
//     previewImage: 'https://a0.muscache.com/im/pictures/1c305844-e42a-4f0c-a381-6b6cf19bcbd0.jpg?im_w=1200',
//     avgStarRating: 5,
//   },
//   {
//     ownerId: 3,
//     address: '4 North Dr',
//     city: 'East Lyme',
//     state: 'Connecticut',
//     country: 'United States',
//     name: 'Entire home',
//     description: "Beachfront Paradise",
//     price: 295,
//     previewImage: 'https://a0.muscache.com/im/pictures/d6623150-0f90-4651-b48d-9c57d4554bb3.jpg?im_w=1200',
//     avgStarRating: 5,
//   }
// ];

// module.exports = {
//   async up (queryInterface, Sequelize) {

//      try {
//       await Spot.bulkCreate(rentalListings, {
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
//       await queryInterface.bulkDelete('Spots', null, {});
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// };
