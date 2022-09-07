import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    body: String,
    rating: Number,
})

export const Review = mongoose.model('Review', ReviewSchema)