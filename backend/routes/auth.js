var express = require("express");
var router = express.Router();
var { signout, signup, signin } = require("../controllers/auth.js");
const { check } = require("express-validator");

//Routers........
router.post(
  "/signup",
  [
    check("name", "Length should be >=3").isLength({ min: 3 }),
    check("email", "Must be email").isEmail(),
    check("password", "Password >=3").isLength({ min: 3 })
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
