import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCampgroundByIdQuery, useDeleteCampgroundMutation } from "../api";
import { Link } from "react-router-dom";

const Campground = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetCampgroundByIdQuery(params.id);
  const [deleteCampground] = useDeleteCampgroundMutation();

  const clickHandler = async (e) => {
    await deleteCampground(params.id);
    navigate("/campgrounds");
  };

  if (isFetching) {
    return "Loading...";
  }

  return (
    <div>
      <div className=" w-1/2 mx-auto border mb-4">
        <img src={data.image} alt="..." />
        <div className="p-2">
          <h1 className="font-bold text-xl">{data.name}</h1>
          <h2>{data.description}</h2>
        </div>
        <div className="p-2 border-y">
          <p>
            <small className="text-slate-400">{data.location}</small>
          </p>
        </div>
        <div className="p-2 border-b">
          <p>${data.price}/night</p>
        </div>
        <div className="p-2">
          <Link to={`/campgrounds/${params.id}/edit`}>
            <button className="bg-sky-600 px-3 py-1 rounded-lg mr-4">Edit</button>
          </Link>
          <button
            className="bg-red-500 px-3 py-1 rounded-lg"
            onClick={clickHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campground;
