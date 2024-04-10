const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'username',
            },
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        profielPic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://via.placeholder.com/150',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'profile',
    }
);

module.exports = Profile;
