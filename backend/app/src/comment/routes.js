const express = require("express");
const controller = require("../../src/comment/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getCommentsList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getComment(req, res);
});
router.post("/", (req, res) => {
    controller.createComment(req, res);
});
router.put("/:id", (req, res) => {
    controller.updateComment(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deleteComment(req, res);
});

module.exports = router;
