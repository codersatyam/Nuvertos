'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('compounds', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      CompoundName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CompounrDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      strImageSource: {
        allowNull: false,
        type: Sequelize.STRING
      },
      strImageAttribution: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('compounds');
  }
};
