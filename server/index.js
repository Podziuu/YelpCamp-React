import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Campground } from "./modules/campground.js";

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/campgrounds", async (req, res) => {
  const camps = await Campground.find({});
  res.status(200).json(camps);
});

app.post("/campgrounds", async (req, res) => {
  const camp = req.body;
  const newCamp = new Campground(camp);
  await newCamp.save();
  res.json(newCamp);
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.status(200).json(camp);
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const camp = await Campground.findByIdAndUpdate(id, req.body);
  res.status(200).json(camp);
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.status(200).json(camp);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndDelete(id);
  res.status(200).json(camp);
});

app.listen(5000, () => {
  console.log("LISTENING ON PORT 5000");
});
