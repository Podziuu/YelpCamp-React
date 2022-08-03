import React, { useRef } from "react";
import { useGetCampgroundByIdQuery, useEditCampgroundMutation } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditCampground = () => {
  const params = useParams();
  const nameInput = useRef();
  const locationInput = useRef();
  const imageInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef()
  const navigate = useNavigate();
  const { data, isFetching } = useGetCampgroundByIdQuery(params.id);
  const [editCampground] = useEditCampgroundMutation();


  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const location = locationInput.current.value;
    const image = imageInput.current.value;
    const price = priceInput.current.value;
    const description = descriptionInput.current.value;

    await editCampground({
        id: params.id,
        body: {
            name,
            location,
            image,
            price,
            description,
        }
    });
    navigate(`/campgrounds/${params.id}`)
  };

  if (isFetching) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col mx-auto w-1/3">
      <h1 className="text-center text-4xl font-bold">New Campground</h1>
      <form onSubmit={submitHandler} className="mt-4">
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Name</label>
          <input
            ref={nameInput}
            type="text"
            id="name"
            placeholder="Campground Name"
            className="border border-black p-2"
            defaultValue={data.name}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="location">Location</label>
          <input
            ref={locationInput}
            type="text"
            id="location"
            placeholder="Campground Location"
            className="border border-black p-2"
            defaultValue={data.location}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="image">Image Url</label>
          <input
            ref={imageInput}
            type="text"
            id="image"
            placeholder="Campground Image"
            className="border border-black p-2"
            defaultValue={data.image}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="price">Price</label>
          <input
            ref={priceInput}
            type="number"
            id="price"
            placeholder="0.00"
            className="border border-black p-2"
            defaultValue={data.price}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            ref={descriptionInput}
            type="text"
            id="description"
            placeholder="Campground Description"
            className="border border-black p-2"
            defaultValue={data.description}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-sky-600 px-4 py-2 rounded-full">
            Update Campground
          </button>
          <Link to={`/campgrounds/${data._id}`}>Back to Campground</Link>
        </div>
      </form>
    </div>
  );
};

export default EditCampground;
