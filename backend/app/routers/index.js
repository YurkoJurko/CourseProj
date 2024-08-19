const commentRoutes = require("../src/comment/routes");
const likeRoutes = require("../src/like/routes");
const postRoutes = require("../src/post/routes");
const roleRoutes = require("../src/role/routes");
const tagRoutes = require("../src/tag/routes");
const userRoutes = require("../src/user/routes");

module.exports = (app) => {
    app.use("/comment", commentRoutes);
    app.use("/like", likeRoutes);
    app.use("/post", postRoutes);
    app.use("/role", roleRoutes);
    app.use("/tag", tagRoutes);
    app.use("/user", userRoutes);
    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}