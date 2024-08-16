const express = require("express");
const controller = require("../../src/post/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getPostsList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getPost(req, res);
});
router.post("/", (req, res) => {
    controller.createPost(req, res);
});
router.put("/:id", (req, res) => {
    controller.updatePost(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deletePost(req, res);
});

module.exports = router;
