const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// your code goes here
app.get("/mario", async (req, res) => {
  try {
    const data = await marioModel.find();
    res.json({
      status: "success",
      data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
app.get("/mario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await marioModel.find({ _id: id });
    res.json({
      status: "success",
      data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

app.post("/mario", async (req, res) => {
  try {
    const credtials = req.body;
    const data = await marioModel.create(credtials);
    res.status(201).json({
      message: "newly saved character",
      data,
    });
  } catch (e) {
    res.status(400).json({
      message: "name or weight is missing",
    });
  }
});
app.patch("/mario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await marioModel.updateOne({ _id: id }, req.body);
    res.json({
      data,
    });
  } catch (e) {
    res.status(200).json({
      message: e.message,
    });
  }
});
app.delete("/mario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await marioModel.deleteOne({ _id: id });
    res.status(200).json({
      message: "character deleted",
      data,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
module.exports = app;
