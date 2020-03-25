const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getRoomById,
  createRoom,
  getRoom,
  photo,
  deleteRoom,
  updateRoom,
  getAllRooms,
  getAllUniqueRooms
} = require("../controllers/room");

//Params ...............
router.param("userId", getUserById);
router.param("roomId", getRoomById);

//Routes
//Create rooms
router.post(
  "/room/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createRoom
);

//read routes
router.get("/room/:roomId", getRoom);
router.get("/room/photo/:roomId", photo);

//delete rooms
router.delete(
  "/room/:roomId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteRoom
);

//Update rooms
router.put(
  "/room/:roomId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateRoom
);

router.get("/rooms", getAllRooms);
router.get("/rooms/categories", getAllUniqueRooms);

module.exports = router;
