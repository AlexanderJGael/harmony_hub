const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Messages extends Model {
/*   checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  } */

  static associate(models) {
    Messages.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
}

Messages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Messages;