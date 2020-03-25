const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User Found"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, userFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err: "You are not authorized"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account"
        });
      }
      return res.json(order);
    });
};

exports.pushBookingInPurchaseList = (req, res, next) => {
  let booking = [];
  req.body.order.products.forEach(product => {
    booking.push({
      _id: room._id,
      name: room.name,
      description: room.description,
      category: room.category,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //Store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: booking } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          err: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};
