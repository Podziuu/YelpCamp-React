import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Campground } from "./modules/campground.js";
import ExpressError from "./utils/ExpressError.js";
import campgroundSchema from "./schemas/campgroundSchema.js";
import reviewSchema from "./schemas/reviewSchema.js";
import { Review } from "./modules/review.js";

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  console.log(error, "here");
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/campgrounds", async (req, res, next) => {
  try {
    const camps = await Campground.find({});
    res.status(200).json(camps);
  } catch (err) {
    next(err);
  }
});

app.post("/campgrounds", validateCampground, async (req, res, next) => {
  try {
    const camp = req.body;
    const newCamp = new Campground(camp);
    await newCamp.save();
    res.json(newCamp);
  } catch (error) {
    next(error);
  }
});

app.get("/campgrounds/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const camp = await Campground.findById(id).populate("reviews");
    res.json(camp);
  } catch (err) {
    next(err);
  }
});

app.put("/campgrounds/:id", validateCampground, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const camp = await Campground.findByIdAndUpdate(id, req.body);
    res.status(200).json(camp);
  } catch (err) {
    next(err);
  }
});

app.get("/campgrounds/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    res.status(200).json(camp);
  } catch (err) {
    next(err);
  }
});

app.delete("/campgrounds/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const camp = await Campground.findByIdAndDelete(id);
    res.status(200).json(camp);
  } catch (err) {
    next(err);
  }
});

app.post("/campgrounds/:id/reviews", validateReview, async (req, res, next) => {
  try {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});

app.delete("/campgrounds/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    console.log('hello')
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
    const review = await Review.findByIdAndDelete(reviewId)
    res.status(200).json(review)
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, Something went wrong";
  console.log(err, "in error middleware");
  res.status(statusCode).json(err);
});

app.listen(5000, () => {
  console.log("LISTENING ON PORT 5000");
});
