'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ContestInstances', [
        { contest_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { contest_id: 2, createdAt: new Date(), updatedAt: new Date() },
        { contest_id: 3, createdAt: new Date(), updatedAt: new Date() },
        { contest_id: 4, createdAt: new Date(), updatedAt: new Date() },
        { contest_id: 5, createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
