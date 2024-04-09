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
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: false,
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
