'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
            userId: 2,
            spotId: 1,
            startDate: `11-5-2021`,
            endDate:`11-8-2021`
          },
          {
            userId: 3,
            spotId: 1,
            startDate: `12-5-2023`,
            endDate:`1-15-2024`
          },
          {
            userId: 2,
            spotId: 2,
            startDate: `1-2-2024`,
            endDate:`1-12-2024`
          },
          {
          userId: 3,
          spotId: 2,
          startDate: '1-5-2022',
          endDate: '1-18-2022'
          },
          {
            userId: 1,
            spotId: 3,
            startDate: `10-5-2021`,
            endDate:`10-20-2021`
          },
          {
            userId: 3,
            spotId: 3,
            startDate: `12-5-2023`,
            endDate:`1-15-2024`
          },
          {
            userId: 1,
            spotId: 4,
            startDate: `1-2-2023`,
            endDate:`1-12-2023`
          },
          {
            userId: 3,
            spotId: 4,
            startDate: `3-12-2017`,
            endDate:`3-18-2017`
          },
          {
            userId: 1,
            spotId: 5,
            startDate: `6-19-2023`,
            endDate:`6-25-2023`
          },
          {
          userId: 2,
          spotId: 5,
          startDate: '8-5-2025',
          endDate: '8-8-2025'
          },
          {
            userId: 1,
            spotId: 6,
            startDate: `3-2-2023`,
            endDate:`3-7-2023`
          },
          {
          userId: 3,
          spotId: 6,
          startDate: '4-5-2024',
          endDate: '5-6-2024'
          }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options);
  }
};


// let bookingSeeds = [
//   {
//     userId: 2,
//     spotId: 1,
//     startDate: `11-5-2021`,
//     endDate:`11-8-2021`
//   },
//   {
//     userId: 3,
//     spotId: 1,
//     startDate: `12-5-2023`,
//     endDate:`1-15-2024`
//   },
//   {
//     userId: 2,
//     spotId: 2,
//     startDate: `1-2-2024`,
//     endDate:`1-12-2024`
//   },
//   {
//   userId: 3,
//   spotId: 2,
//   startDate: '1-5-2022',
//   endDate: '1-18-2022'
//   },
//   {
//     userId: 1,
//     spotId: 3,
//     startDate: `10-5-2021`,
//     endDate:`10-20-2021`
//   },
//   {
//     userId: 3,
//     spotId: 3,
//     startDate: `12-5-2023`,
//     endDate:`1-15-2024`
//   },
//   {
//     userId: 1,
//     spotId: 4,
//     startDate: `1-2-2023`,
//     endDate:`1-12-2023`
//   },
//   {
//     userId: 3,
//     spotId: 4,
//     startDate: `3-12-2017`,
//     endDate:`3-18-2017`
//   },
//   {
//     userId: 1,
//     spotId: 5,
//     startDate: `6-19-2023`,
//     endDate:`6-25-2023`
//   },
//   {
//   userId: 2,
//   spotId: 5,
//   startDate: '8-5-2025',
//   endDate: '8-8-2025'
//   },
//   {
//     userId: 1,
//     spotId: 6,
//     startDate: `3-2-2023`,
//     endDate:`3-7-2023`
//   },
//   {
//   userId: 3,
//   spotId: 6,
//   startDate: '4-5-2024',
//   endDate: '5-6-2024'
//   }
// ]

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */

//     // use bulkInser('Bookings')
//      try {
//       await Booking.bulkCreate(bookingSeeds, {
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
//     try {
//       await queryInterface.bulkDelete('Bookings', null, {});
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// };
