const express = require("express");
const router = express.Router();

const { getCityById } = require("../controllers/city");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("cityId", getCityById);

module.exports = router;
