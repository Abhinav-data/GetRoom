const { Order, RoomCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("rooms.room", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "No order found"
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        err: "Error creating order"
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "No orders Found"
        });
      }
      res.json(order);
    });
};
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.OrderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          err: "cannot update order"
        });
      }
      res.json(order);
    }
  );
};
