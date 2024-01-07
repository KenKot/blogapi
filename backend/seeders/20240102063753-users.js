"use strict";

const models = require("../models");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const users = [];

    const hashedPassword = await bcrypt.hash("asdf", 10);

    const user = {
      id: 1,
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@gmail.com",
      password: hashedPassword,
    };

    users.push(user);

    return queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  },
};
