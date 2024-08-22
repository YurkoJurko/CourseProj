const express = require("express");
const controller = require("../../src/user/controller/index.js");

const router = express.Router();

router.get("/", (req, res) => { //for collection
    controller.getUsersList(req, res);
});
router.get("/:id", (req, res) => { //for item
    controller.getUser(req, res);
});
router.post("/", (req, res) => {
    controller.createUser(req, res);
});

router.post("/login", (req, res) => {
    controller.login(req, res);
})

router.put("/:id", (req, res) => {
    controller.updateUser(req, res);
});
router.delete("/:id", (req, res) => {
    controller.deleteUser(req, res);
});

module.exports = router;
