import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetCampgroundByIdQuery,
  useDeleteCampgroundMutation,
  useMakeReviewMutation,
  useDeleteReviewMutation,
} from "../api";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import useCapitalizeString from "../hooks/useCapitalizeString";
import Error from "./Error";

const Campground = () => {
  const [reviewTouched, setReviewTouched] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetCampgroundByIdQuery(params.id);
  const [deleteCampground] = useDeleteCampgroundMutation();
  const ratingInput = useRef();
  const reviewInput = useRef();
  const [makeReview, { error: reviewError }] = useMakeReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const { errors, setError, success, setMessage } = useValidation();
  const capitalize = useCapitalizeString();

  const clickHandler = async (e) => {
    await deleteCampground(params.id);
    navigate("/campgrounds");
  };

  if (isFetching) {
    return "Loading...";
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const rating = ratingInput.current.value;
    const review = reviewInput.current.value;

    setError(review, "reviewError", "Review");
    setError(rating, "ratingError", "Rating");
    console.log(errors);

    const response = await makeReview({
      id: params.id,
      body: {
        rating,
        body: review,
      },
    });

    if (response.error) {
      return <Error data={response.error.data.message} />;
    }
    console.log(response);
  };

  const changeHandler = (e) => {
    setMessage(
      e.target.value,
      `${e.target.id}Message`,
      `${e.target.id}Error`,
      capitalize(e.target.id)
    );
    setReviewTouched(true);
  };

  const checkMessage = (mess) => {
    if (!reviewTouched) return;
    return mess ? "border-green-500" : "border-red-500";
  };

  const deleteHandler = async (e) => {
    await deleteReview({ id: params.id, reviewId: e });
  };

  return (
    <>
      {error && error.data}
      {!error && (
        <div className="w-1/2 mx-auto mb-4 flex">
          <div>
            <img src={data.image} alt="..." />
            <div className="p-2 border">
              <h1 className="font-bold text-xl">{data.name}</h1>
              <h2>{data.description}</h2>
            </div>
            <div className="p-2 border-x">
              <p>
                <small className="text-slate-400">{data.location}</small>
              </p>
            </div>
            <div className="p-2 border">
              <p>${data.price}/night</p>
            </div>
            <div className="p-2 border border-t-0">
              <Link to={`/campgrounds/${params.id}/edit`}>
                <button className="bg-sky-600 px-3 py-1 rounded-lg mr-4">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-500 px-3 py-1 rounded-lg"
                onClick={clickHandler}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-10 w-1/2">
            <h2 className="text-3xl">Leave a Review</h2>
            <form onSubmit={submitHandler} className="flex flex-col" noValidate>
              <div className="flex flex-col mb-3">
                <label htmlFor="rating" className="appearance-none">
                  Rating
                </label>
                <input
                  ref={ratingInput}
                  type="range"
                  id="rating"
                  required
                  min="1"
                  max="5"
                  className={`w-64 h-2 bg-gray-200 appearance-none rounded-lg cursor-pointer range`}
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="review">Review</label>
                <textarea
                  ref={reviewInput}
                  type="text"
                  id="review"
                  placeholder="Review"
                  required
                  col="30"
                  rows="3"
                  className={`border ${checkMessage(
                    success.reviewMessage
                  )} focus:border-2 outline-none `}
                  onChange={changeHandler}
                />
                <p className="text-red-600">{errors.reviewError}</p>
                <p className="text-green-500">{success.reviewMessage}</p>
              </div>
              <button className="bg-green-500 text-white self-start px-4 py-2 rounded-full">
                Submit
              </button>
            </form>
            {data.reviews.map((review) => {
              return (
                <div className="mt-4 flex flex-col border p-2" key={review._id}>
                  <p>Rating: {review.rating}</p>
                  <p>Review: {review.body}</p>
                  <button
                    onClick={() => deleteHandler(review._id)}
                    className="self-start bg-red-500 py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Campground;
