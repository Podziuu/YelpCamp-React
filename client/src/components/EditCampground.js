import React, { useRef } from "react";
import { useGetCampgroundByIdQuery, useEditCampgroundMutation } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditCampground = () => {
  const params = useParams();
  const nameInput = useRef();
  const locationInput = useRef();
  const navigate = useNavigate();
  const { data, isFetching } = useGetCampgroundByIdQuery(params.id);
  const [editCampground] = useEditCampgroundMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const location = locationInput.current.value;

    await editCampground({
        id: params.id,
        body: {
            name,
            location,
        }
    });
    navigate(`/campgrounds/${params.id}`)
  };

  if (isFetching) {
    return "Loading...";
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          ref={nameInput}
          type="text"
          id="name"
          placeholder="Campground Name"
          defaultValue={data.name}
        />
        <label htmlFor="location">Location</label>
        <input
          ref={locationInput}
          type="text"
          id="location"
          placeholder="Campground Location"
          defaultValue={data.location}
        />
        <button>Submit</button>
      </form>
      <Link to="/campgrounds">Back</Link>
    </div>
  );
};

export default EditCampground;
