'use strict';

const { User, Messages, Blog, Forum, Profile } = require('../models/');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', User.tableAttributes);
    await queryInterface.createTable('Messages', Messages.tableAttributes);
    await queryInterface.createTable('Blog', Blog.tableAttributes);
    await queryInterface.createTable('Forum', Forum.tableAttributes);
    await queryInterface.createTable('Profile', Profile.tableAttributes);

    await queryInterface.addIndex('Messages', ['userId']);
    await queryInterface.addIndex('Messages', ['username']);
    await queryInterface.addIndex('Blog', ['userId']);
    await queryInterface.addIndex('Blog', ['username']);
    await queryInterface.addIndex('Forum', ['authorId']);
    await queryInterface.addIndex('Forum', ['authorName']);
    await queryInterface.addIndex('Profile', ['userId']);
    await queryInterface.addIndex('Profile', ['username']);

    User.hasMany(Messages, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(Blog, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(Forum, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE',
    });

    User.hasOne(Profile, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Blog.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Forum.belongsTo(User, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE',
    });

    Messages.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Profile.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('blog');
    await queryInterface.dropTable('messages');
    await queryInterface.dropTable('forum');
    await queryInterface.dropTable('profile');
    await queryInterface.dropTable('user');
  },
};
