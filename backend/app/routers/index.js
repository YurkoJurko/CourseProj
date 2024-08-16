const comment = require("../models/Comment");
const like = require("../models/Like");
const post = require("../models/Post");
const role = require("../models/Role");
const tag = require("../models/Tag");
const user = require("../models/User");

module.exports = (app) => {
    app.use("/comment", comment);
    app.use("/like", like);
    app.use("/post", post);
    app.use("/role", role);
    app.use("/tag", tag);
    app.use("/user", user);
    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}