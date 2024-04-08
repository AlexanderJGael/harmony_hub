const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "User",
                key: "id",
            },
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "User",
                key: "username",
            },
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
        modelName: "blog",
    }
);

module.exports = Blog;
