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
        lastName: 'Doe'
      },
      {
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Tony',
        lastName: 'Stark'
      },
      {
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Bill',
        lastName: 'Burr'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
