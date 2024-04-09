'use strict';

const { User, Messages, Blog, Forum, Profile } = require('../');

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
    });

    Forum.belongsTo(User, {
      foreignKey: 'authorId',
    });

    Messages.belongsTo(User, {
      foreignKey: 'userId',
    });

    Profile.belongsTo(User, {
      foreignKey: 'userId',
    });

    await queryInterface.addConstraint('Messages', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_messages_userId',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Messages', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_messages_username',
      references: {
        table: 'User',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Blog', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_blog_userId',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Blog', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_blog_username',
      references: {
        table: 'User',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Forum', {
      fields: ['authorId'],
      type: 'foreign key',
      name: 'fk_forum_authorId',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Forum', {
      fields: ['authorName'],
      type: 'foreign key',
      name: 'fk_forum_authorName',
      references: {
        table: 'User',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Profile', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_profile_userId',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('Profile', {
      fields: ['username'],
      type: 'foreign key',
      name: 'fk_profile_username',
      references: {
        table: 'User',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
    await queryInterface.dropTable('Messages');
    await queryInterface.dropTable('Blog');
    await queryInterface.dropTable('Forum');
    await queryInterface.dropTable('Profile');
  },
};
