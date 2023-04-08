'use strict';

const { Review } = require('../models');

let reviewSeeds = [
  {
    userId: 2,
    spotId: 1,
    review: "I just had the most amazing stay at this treehouse in the countryside. It was like a little slice of heaven up there! The farm animals were a nice touch, and the view was breathtaking. If you're looking for a peaceful getaway, this is the place to be.",
    stars: 5
  },
  {
    userId: 3,
    spotId: 1,
    review: "Loved this heavenly treehouse in the countryside! The view was breathtaking and it was the perfect peaceful retreat.",
    stars: 4
  },
  {
    userId: 3,
    spotId: 2,
    review: "Interesting stay at Moose Meadow Lodge Treehouse. Rustic charm, lovely natural setting, but lacking modern comforts. Overall, okay.",
    stars: 3
  },
  {
    userId: 2,
    spotId: 2,
    review: "Interesting stay at the Moose Meadow Lodge Treehouse. Unique and well-crafted, but a bit smaller than expected. Beautiful nature surroundings.",
    stars: 3
  },
  {
    userId: 3,
    spotId: 3,
    review: "Stunning view of Empire State Building, modern and clean place with everything needed. Perfect location, unforgettable experience!",
    stars: 4
  },
  {
    userId: 3,
    spotId: 4,
    review: 'Not a camping person, but okay stay at Airstream camper in Prince Edward County. Clean, comfortable, quiet setting. Different experience, but location was great with plenty to do. Worth trying for camping fans.',
    stars: 3
  },
  {
    userId: 1,
    spotId: 4,
    review: "Great retreat at Airstream camper in Prince Edward County. Cozy and peaceful with a unique setting. Perfect location for exploring. I even did some programming while camping! Highly recommended for a refreshing getaway.",
    stars: 4
  },
  {
    userId: 2,
    spotId: 5,
    review: "Great family vacation at the cozy lake house near Jiminy Peak in Averill Park. Spacious, clean, and had everything we needed. Perfect location for outdoor activities. Hosts were wonderful. Highly recommend!",
    stars: 4
  },
  {
    userId: 2,
    spotId: 6,
    review: "The beach house was a real treat for this desert-dweller. Loved the sound of the waves, fresh sea air, and the town's local seafood. Can't wait to come back!",
    stars: 5
  },
  {
    userId: 1,
    spotId: 6,
    review: "Loved the beach house in East Lyme! Stunning views and beautiful decor. Perfect place to relax and explore the charming town. Highly recommend!",
    stars: 4
  },
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
