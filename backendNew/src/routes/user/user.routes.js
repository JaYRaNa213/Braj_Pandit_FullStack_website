const express = require("express");
const router = express.Router();
const { updateUserProfile } = require("../../controllers/user.controller");

router.post("/profile", updateUserProfile);

module.exports = router;
