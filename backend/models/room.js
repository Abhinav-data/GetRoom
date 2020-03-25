const mongoose = require("nomgoose");
const { ObjectId } = mongoose.Schema;

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: "City",
      required: true
    },
    available: {
      type: Number
    },
    booked: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
