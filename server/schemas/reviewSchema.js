import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  body: Joi.string().required()
});

export default reviewSchema;
