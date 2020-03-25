const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RoomCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Room"
  },
  name: String,
  count: Number,
  price: Number
});

const RoomCart = mongoose.model("RoomCart", RoomCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    rooms: [RoomCartSchema],
    transaction_id: {},
    amount: { type: Number },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, RoomCart };
