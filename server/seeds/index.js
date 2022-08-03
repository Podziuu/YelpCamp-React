import mongoose from "mongoose";
import { Campground } from "../modules/campground.js";
import { descriptors, places } from "./seedHelpers.js";
import { cities } from "./cities.js";

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      name: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, eaque possimus iste similique ipsa minima harum tenetur omnis modi error doloremque sed explicabo suscipit ullam aliquid voluptatem nostrum minus. Nam!",
      price,
    });
    camp.save();
  }
};

seedDb();
