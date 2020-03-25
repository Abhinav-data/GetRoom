const City = require("../models/city");

exports.getCityById = (req, res, next, id) => {
  City.findById(id).exec((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "City not found"
      });
    }
    req.city = city;
    next();
  });
};

exports.createCity = (req, res) => {
  const city = new City(req.body);
  city.save((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save City"
      });
    }
    res.json(city);
  });
};

exports.getCity = (req, res) => {
  return res.json(req.city);
};

exports.getAllCities = (req, res) => {
  City.find().exec((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to get all cities"
      });
    }
    res.json(city);
  });
};

exports.updateCity = (req, res) => {
  const city = req.city;
  city.name = req.body.name;
  city.save((err, updatedcity) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to update City"
      });
    }
    res.json(updatedcity);
  });
};

exports.deleteCity = (req, res) => {
  const city = req.city;
  city.remove((err, removedcity) => {
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
