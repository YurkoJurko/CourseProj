const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

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