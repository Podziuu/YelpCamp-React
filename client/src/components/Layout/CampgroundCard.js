import React from "react";
import { Link } from "react-router-dom";

const CampgroundCard = (props) => {
  const camp = props.data;

  return (
    <div className="flex my-4">
      <div>
        <img src={camp.image} alt="..." />
      </div>
      <div className="flex flex-col justify-between">
        <h5 className="font-bold text-xl pb-4">{camp.name}</h5>
        <div>
          <p className="">{camp.description}</p>
          <p className="text-slate-500">
            <small>{camp.location}</small>
          </p>
        </div>
        <Link
          className="bg-blue-600 px-4 py-2 rounded-xl w-fit self-end text-white"
          to={`/campgrounds/${camp._id}`}
        >
          View {camp.name}
        </Link>
      </div>
    </div>
  );
};

export default CampgroundCard;
