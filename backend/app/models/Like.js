const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");
const Post = require("../models/Post");
const User = require("../models/User");

const Like = sequelize.define(
    "like",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }
);

User.hasMany(Like, {
    foreignKey: "user_id",
    sourceKey: "id",
});

Like.belongsTo(User,{
    foreignKey: "user_id",
    sourceKey: "id",
});

Post.hasMany(Like, {
    foreignKey: "post_id",
    sourceKey: "id",
});

Like.belongsTo(Post,{
    foreignKey: "post_id",
    sourceKey: "id",
});

(async () => {
    try {
        await sequelize.sync();
        console.log("Like table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Like table:",
            error.message,
        );
    }
})();

module.exports = Like;