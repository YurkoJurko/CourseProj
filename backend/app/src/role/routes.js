const express = require("express");
const controller = require("../../src/role/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getRolesList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getRole(req, res);
});
router.post("/", (req, res) => {
    controller.createRole(req, res);
});
router.put("/:id", (req, res) => {
    controller.updateRole(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deleteRole(req, res);
});

module.exports = router;
