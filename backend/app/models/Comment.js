const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");
const Like = require("../models/Like");
const Post = require("../models/Post");
const User = require("../models/User");

const Comment = sequelize.define(
    "comment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        parent_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        like_count:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        created_at:{
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }
);

Comment.hasMany(Comment, {
    foreignKey: "parent_id",
    sourceKey: "id",
});

Comment.belongsTo(Comment,{
    foreignKey: "parent_id",
    sourceKey: "id",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    sourceKey: "id",
});

Comment.belongsTo(User,{
    foreignKey: "user_id",
    sourceKey: "id",
});


Post.hasMany(Comment, {
    foreignKey: "post_id",
    sourceKey: "id",
});

Like.belongsTo(Comment,{
    foreignKey: "post_id",
    sourceKey: "id",
});

(async () => {
    try {
        await sequelize.sync();
        console.log("Comment table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Comment table:",
            error.message,
        );
    }
})();

module.exports = Comment;