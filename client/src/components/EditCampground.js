import React, { useRef, useState } from "react";
import { useGetCampgroundByIdQuery, useEditCampgroundMutation } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import useCapitalizeString from "../hooks/useCapitalizeString";
import FormInput from "./Layout/FormInput";
import Error from "./Error";

const EditCampground = () => {
  const params = useParams();
  const nameInput = useRef();
  const locationInput = useRef();
  const imageInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const navigate = useNavigate();
  const { data, isFetching } = useGetCampgroundByIdQuery(params.id);
  const [editCampground, { error }] = useEditCampgroundMutation();
  const { errors, setError, success, setMessage } = useValidation();
  const capitalize = useCapitalizeString();

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const location = locationInput.current.value;
    const image = imageInput.current.value;
    const price = priceInput.current.value;
    const description = descriptionInput.current.value;

    setError(name, "nameError", "Name");
    setError(location, "locationError", "Location");
    setError(image, "imageError", "Image");
    setError(price, "priceError", "Price");
    setError(description, "descriptionError", "Description");

    if (!name || !location || !image || !price || !description) {
      return;
    }

    const response = await editCampground({
      id: params.id,
      body: {
        name,
        location,
        image,
        price,
        description,
      },
    });
    if (response.error) {
      // setServerError({
      //   message: response.error.data,
      //   isError: true,
      // });
      return;
    } else {
      navigate(`/campgrounds/${params.id}`);
    }
  };

  if (isFetching) {
    return "Loading...";
  }

  const changeHandler = (e) => {
    setMessage(
      e.target.value,
      `${e.target.id}Message`,
      `${e.target.id}Error`,
      capitalize(e.target.id)
    );
  };

  const checkMessage = (mess) => {
    return mess ? "border-red-500" : "border-green-500";
  };

  return (
    <>
      {error && <Error data={error} />}
      {!error && (
        <div className="flex flex-col mx-auto w-1/3">
          <div>
            <h1 className="text-center text-4xl font-bold">New Campground</h1>
            <form onSubmit={submitHandler} className="mt-4" noValidate>
              <FormInput
                id="name"
                label="Name"
                forwardRef={nameInput}
                placeholder="Campground Name"
                changeHandler={changeHandler}
                error={errors.nameError}
                success={success.nameMessage}
                type="text"
                value={data.name}
                classes={checkMessage(errors.nameError)}
              />
              <FormInput
                id="location"
                label="Location"
                forwardRef={locationInput}
                placeholder="Campground Location"
                changeHandler={changeHandler}
                error={errors.locationError}
                success={success.locationMessage}
                type="text"
                value={data.location}
                classes={checkMessage(errors.locationError)}
              />
              <FormInput
                id="image"
                label="Image"
                forwardRef={imageInput}
                placeholder="Image Url"
                changeHandler={changeHandler}
                error={errors.imageError}
                success={success.imageMessage}
                type="text"
                value={data.image}
                classes={checkMessage(errors.imageError)}
              />
              <FormInput
                id="price"
                label="Price"
                forwardRef={priceInput}
                placeholder="0.00"
                changeHandler={changeHandler}
                error={errors.priceError}
                success={success.priceMessage}
                min="1"
                type="text"
                value={data.price}
                classes={checkMessage(errors.priceError)}
              />
              <div className="flex flex-col mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  ref={descriptionInput}
                  type="text"
                  id="description"
                  placeholder="Campground Description"
                  className={`border border-black p-2 min-h-[80px] ${checkMessage(
                    errors.descriptionError
                  )} focus:outline-none focus:border-2 `}
                  onChange={changeHandler}
                  required
                  defaultValue={data.description}
                />
                <p className="text-red-600">
                  {errors.descriptionError && errors.descriptionError}
                </p>
                <p className="text-green-500">
                  {success.descriptionMessage && success.descriptionMessage}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-sky-600 px-4 py-2 rounded-full">
                  Update Campground
                </button>
                <Link to={`/campgrounds/${data._id}`}>Back to Campground</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCampground;
