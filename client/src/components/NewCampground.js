import React, { useRef } from "react";
import { useMakeCampgroundMutation } from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewCampground = () => {
  const nameInput = useRef();
  const locationInput = useRef();
  const navigate = useNavigate();

  console.log(useMakeCampgroundMutation());

  const [postCampground] = useMakeCampgroundMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameInput.current.value;
    const location = locationInput.current.value;
    await postCampground({
      name,
      location,
    });
    navigate("/campgrounds");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
          ref={nameInput}
          type="text"
          id="name"
          placeholder="Campground Name"
        />
        <label htmlFor="location">Location</label>
        <input
          ref={locationInput}
          type="text"
          id="location"
          placeholder="Campground Location"
        />
        <button>Submit</button>
      </form>
      <Link to="/campgrounds">Back</Link>
    </div>
  );
};

export default NewCampground;
