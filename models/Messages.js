const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Messages extends Model {
  static associate(models) {
    Messages.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }
};

Messages.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'username',
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'messages',
  }
);

module.exports = Messages;