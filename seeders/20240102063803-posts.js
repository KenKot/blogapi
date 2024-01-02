"use strict";

const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [];

    for (let i = 1; i < 11; i++) {
      posts.push({
        title: `Title ${i}`,
        body: `Body ${i}`,
        isPublished: true,
        userId: 1,
      });
    }

    return queryInterface.bulkInsert("Posts", posts);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("People", null, {}, models.Post);
  },
};
