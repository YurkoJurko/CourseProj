const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");
const Post = require("../models/Post");

const Tag = sequelize.define(
    "tag",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        icon_path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }
);

Tag.hasMany(Post, {
    foreignKey: "post_id",
    sourceKey: "id",
});

Post.belongsTo(Tag,{
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

module.exports = Tag;