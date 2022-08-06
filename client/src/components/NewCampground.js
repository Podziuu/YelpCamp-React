import React, { useRef, useState } from "react";
import { useMakeCampgroundMutation } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import useCapitalizeString from "../hooks/useCapitalizeString";
import FormInput from "./Layout/FormInput";
import Error from "./Error";

const NewCampground = () => {
  const [serverError, setServerError] = useState({
    message: "",
    isError: false,
  });
  const nameInput = useRef();
  const locationInput = useRef();
  const imageInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();
  const navigate = useNavigate();
  const { errors, setError, success, setMessage } = useValidation();
  const capitalize = useCapitalizeString();

  const [postCampground, { error }] = useMakeCampgroundMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const location = locationInput.current.value;
    const image = imageInput.current.value;
    const price = priceInput.current.value;
    const description = descriptionInput.current.value;

    // setMessage(name, 'nameError', 'nameError', 'Name')
    setError(name, "nameError", "Name");
    setError(location, "locationError", "Location");
    setError(image, "imageError", "Image");
    setError(price, "priceError", "Price");
    setError(description, "descriptionError", "Description");
    // console.log(errors.length);
    // console.log("Are we here ?");
    // console.log(Object.values(errors).every((e) => e === undefined));

    if (!name || !location || !image || !price || !description) {
      return;
    }

    if (Object.values(errors).every((e) => e === undefined)) {
      const response = await postCampground({
        name,
        location,
        image,
        price,
        description,
      });
      console.log(response);
      if (response.error) {
        console.log(response.error.data);
        setServerError({
          message: response.error.data,
          isError: true,
        });
      } else {
        navigate(`/campgrounds`);
      }
      // console.log(response.data._id)
    }
  };

  const changeHandler = (e) => {
    setMessage(
      e.target.value,
      `${e.target.id}Message`,
      `${e.target.id}Error`,
      capitalize(e.target.id)
    );
  };

  const checkMessage = (mess) => {
    return mess ? "border-green-500" : "border-red-500";
  };

  return (
    <>
      {error && <Error data={error} />}
      {!error && (
        <div className="flex flex-col mx-auto w-1/3">
          {serverError.isError && <Error message={serverError.message} />}
          {!serverError.isError && (
            <>
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
                  classes={checkMessage(success.nameMessage)}
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
                  classes={checkMessage(success.locationMessage)}
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
                  classes={checkMessage(success.imageMessage)}
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
                  classes={checkMessage(success.priceMessage)}
                />
                <div className="flex flex-col mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    ref={descriptionInput}
                    type="text"
                    id="description"
                    placeholder="Campground Description"
                    className={`border p-2 min-h-[80px] ${checkMessage(
                      success.descriptionMessage
                    )} focus:outline-none focus:border-2 `}
                    onChange={changeHandler}
                    required
                  />
                  <p className="text-red-600">
                    {errors.descriptionError && errors.descriptionError}
                  </p>
                  <p className="text-green-500">
                    {success.descriptionMessage && success.descriptionMessage}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-green-400 px-4 py-2 rounded-full">
                    Add Campground
                  </button>
                  <Link to="/campgrounds">All Campgrounds</Link>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NewCampground;
