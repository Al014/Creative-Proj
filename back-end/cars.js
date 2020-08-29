const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const carSchema = new mongoose.Schema({
  path: String,
  brand: String,
  model: String,
  horsepower: String,
  year: String
});

const Car = mongoose.model('Car', carSchema);

// upload photo
router.post("/", upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const car = new Car({
    path: "/images/" + req.file.filename,
    brand: req.body.brand,
    model: req.body.model,
    horsepower: req.body.horsepower,
    year: req.body.year
  });
  try {
    await car.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/", async (req, res) => {
  try {
    let cars = await Car.find().sort({
      created: -1
    });
    return res.send(cars);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let car = await Car.findOne({
      _id: req.params.id
    });
    return res.send(car);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Car.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try{
    let car = await Car.findOne({
      _id: req.params.id
    });
    car.name = req.body.name;
    car.model = req.body.model;
    car.horsepower = req.body.horsepower;
    car.year = req.body.year;
    await car.save();
    res.sendStatus(200);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Car,
  routes: router,
}
