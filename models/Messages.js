const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Messages extends Model {}

Messages.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: DataTypes.TEXT,
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'messages',
}
);

module.exports = Messages;