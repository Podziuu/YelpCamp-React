import React from "react";

import { Link } from "react-router-dom";
import { useGetCampgroundsQuery } from "../api";
import CampgroundCard from "./Layout/CampgroundCard";

const Campgrounds = () => {
  const { data, isFetching, error } = useGetCampgroundsQuery();

  if (isFetching) {
    return "Loading...";
  }

  return (
    <>
      {error && error.data}
      {!error && (
        <div className="mx-40">
          <h1 className="font-bold text-3xl">All Campgrounds</h1>
          <Link to="/campgrounds/new">Make New Campground</Link>
          <ul>
            {data.map((camp) => {
              return <CampgroundCard key={camp._id} data={camp} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Campgrounds;
