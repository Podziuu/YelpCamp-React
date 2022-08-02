import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCampgroundByIdQuery,useDeleteCampgroundMutation } from "../api";
import { Link } from "react-router-dom";

const Campground = () => {
  const params = useParams();
  const navigate = useNavigate()
  const {data, isFetching} = useGetCampgroundByIdQuery(params.id)
  const [deleteCampground] = useDeleteCampgroundMutation()

  const clickHandler = async (e) => {
    await deleteCampground(params.id)
    navigate('/campgrounds')
  }

  if(isFetching) {
    return "Loading..."
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.location}</p>
      <Link to="/campgrounds">All Campgrounds</Link>
      <Link to={`/campgrounds/${params.id}/edit`}>Edit</Link>
      <button onClick={clickHandler}>Delete</button>
    </div>
  );
};

export default Campground;
