const City = require("../models/city");

exports.getCityById = (req, res, next, id) => {
  City.findById(id).exec(err, city => {
    if (err) {
      return res.status(400).json({
        error: "City not found"
      });
    }
    req.city = city;
  });
  next();
};
