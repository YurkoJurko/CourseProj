const express = require("express");
const controller = require("../../src/like/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getLikesList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getLike(req, res);
});
router.post("/", (req, res) => {
    controller.createLike(req, res);
});
router.put("/:id", (req, res) => {
    controller.updateLike(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deleteLike(req, res);
});

module.exports = router;
