'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        firstName:'John',
        lastName: 'Doe',
        image: 'https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80'
      },
      {
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Tony',
        lastName: 'Stark',
        image: 'https://cdn.vox-cdn.com/thumbor/5bj7tnm3u0Qkndby6zwV5yuAY2U=/0x0:3000x1779/1820x1213/filters:focal(1204x216:1684x696):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/59606327/ktokatitmir0.0.jpg'
      },
      {
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Bill',
        lastName: 'Burr',
        image: 'https://www.hollywoodreporter.com/wp-content/uploads/2022/04/GettyImages-949563862-Splash-2022.jpg?w=2000&h=1126&crop=1'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
