'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contests', [
      { entry_fee: 1, createdAt: new Date(), updatedAt: new Date() },
      { entry_fee: 10, createdAt: new Date(), updatedAt: new Date() },
      { entry_fee: 100, createdAt: new Date(), updatedAt: new Date() },
      { entry_fee: 1000, createdAt: new Date(), updatedAt: new Date() },
      { entry_fee: 10000, createdAt: new Date(), updatedAt: new Date() }
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
