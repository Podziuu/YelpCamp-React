import React from "react";

import { Link } from "react-router-dom";
import { useGetCampgroundsQuery } from "../api";
import CampgroundCard from "./Layout/CampgroundCard";

const Campgrounds = () => {
  const { data, isFetching } = useGetCampgroundsQuery();

  if (isFetching) {
    return "Loading...";
  }

  return (
    <div className="mx-20">
      <h1 className="font-bold text-3xl">All Campgrounds</h1>
      <Link to="/campgrounds/new">Make New Campground</Link>
      <ul>
        {data.map((camp) => {
          return (
            <CampgroundCard key={camp._id} data={camp} />
          );
        })}
      </ul>
    </div>
  );
};

export default Campgrounds;
