"use strict";
const models = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];

    for (let i = 1; i < 4; i++) {
      comments.push({
        body: `Comment Body ${i}`,
        authorName: `Author ${i}`,
        postId: 1,
      });
    }
    return queryInterface.bulkInsert("Comments", comments);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Comments", null, {}, models.Comment);
  },
};
