import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String
})

export const Campground = mongoose.model("Campground", CampgroundSchema)