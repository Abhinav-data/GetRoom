const Room = require("../models/room");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getRoomById = (req, res, next, id) => {
  Room.findById(id)
    .populate("city")
    .exec((err, room) => {
      if (err) {
        return res.status(400).json({
          error: "Room not found"
        });
      }
      req.room = room;
      next();
    });
};

exports.createRoom = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //Destructure the field
    const { name, description, price, city, available, location } = fields;

    if (!name || !description || !price || !city || !available || !location) {
      return res.status(400).json({
        error: "Include All Fields.."
      });
    }
    let room = new Room(fields);

    //Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big"
        });
      }
      room.photo.data = fs.readFileSync(file.photo.path);
      room.photo.contentType = file.photo.type;
    }

    //save to DB
    room.save((err, room) => {
      if (err) {
        return res.status(400).json({
          error: "failed to save photo"
        });
      }
      res.json(room);
    });
  });
};

exports.getRoom = (req, res) => {
  req.room.photo = undefined;
  return res.json(req.Room);
};

exports.photo = (req, res, next) => {
  if (req.room.photo.data) {
    res.set("Content-Type", req.room.photo.contentType);
    return res.send(req.room.photo.data);
  }
  next();
};

exports.updateRoom = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updating code
    let room = req.room;
    room = _.extend(room, fields);

    //Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big"
        });
      }
      room.photo.data = fs.readFileSync(file.photo.path);
      room.photo.contentType = file.photo.type;
    }

    //save to DB
    room.save((err, room) => {
      if (err) {
        return res.status(400).json({
          error: "updation failed"
        });
      }
      res.json(room);
    });
  });
};

exports.deleteRoom = (req, res) => {
  const room = req.room;
  room.remove((err, removedroom) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to remove City"
      });
    }
    res.json({
      message: "Succefully deleted"
    });
  });
};

exports.getAllRooms = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Room.find()
    .select("-photo")
    .populate("city")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, rooms) => {
      if (err) {
        res.status(400).json({
          error: "Unable to fetch rooms"
        });
      }
      res.json(rooms);
    });
};

exports.getAllUniqueRooms = (req, res) => {
  Room.distinct("city", {}, (err, city) => {
    if (err) {
      res.status(400).json({
        error: "Nothing found"
      });
    }
    res.json(city);
  });
};

exports.updateAvailable = (req, res, next) => {
  let myOperations = req.body.order.rooms.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { available: -prod.count, booked: +prod.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
};
