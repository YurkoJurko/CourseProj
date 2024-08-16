const express = require("express");
const controller = require("../../src/tag/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getTagsList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getTag(req, res);
});
router.post("/", (req, res) => {
    controller.createTag(req, res);
});
router.put("/:id", (req, res) => {
    controller.updateTag(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deleteTag(req, res);
});

module.exports = router;
