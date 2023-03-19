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
        email: 'demo@aa.io',
        hashedPassword: bcrypt.hashSync('password'),
        firstName:'Demo',
        lastName: 'User',
        image: 'https://emojis.wiki/thumbs/emojis/man-technologist.webp'
      },
      {
        email: 'ben@aa.io',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Ben',
        lastName: 'Goodman',
        image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80'
      },
      {
        email: 'jen@aa.io',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Jen',
        lastName: 'Fryer',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
