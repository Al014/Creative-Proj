const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();
//const photos = require("./photos.js");
//const Photo = photos.model;

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const companySchema = new mongoose.Schema({
  path: String,
  name: String,
  nationality: String,
  founded: String,
  worth: String
});

const Company = mongoose.model('Company', companySchema);

router.post("/", upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const company = new Company({
    path: "/images/" + req.file.filename,
    name: req.body.name,
    nationality: req.body.nationality,
    founded: req.body.founded,
    worth: req.body.worth
  });
  try {
    await company.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let companies = await Company.find().sort({
      created: -1
    });
    return res.send(companies);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Company.deleteOne({
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
    let company = await Company.findOne({
      _id: req.params.id
    });
    company.name = req.body.name;
    company.nationality = req.body.nationality;
    company.founded = req.body.founded;
    company.worth = req.body.worth;
    await company.save();
    res.sendStatus(200);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Company,
  routes: router,
}
