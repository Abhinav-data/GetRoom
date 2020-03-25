const express = require("express");
const router = express.Router();

const {
  getCityById,
  createCity,
  getCity,
  getAllCities,
  updateCity,
  deleteCity
} = require("../controllers/city");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Params ...............
router.param("userId", getUserById);
router.param("cityId", getCityById);

//Routes..................

//Create
router.post(
  "/city/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCity
);

//Read
router.get("/city/:cityId", getCity);
router.get("/cities", getAllCities);

//Update
router.put(
  "/city/:cityId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCity
);

//Delete
router.delete(
  "/city/:cityId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCity
);

module.exports = router;
