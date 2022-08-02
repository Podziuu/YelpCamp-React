import React from "react";

import { Link } from "react-router-dom";
import { useGetCampgroundsQuery } from "../api";

const Campgrounds = () => {
  const { data, isFetching } = useGetCampgroundsQuery();

  if (isFetching) {
    return "Loading...";
  }

  return (
    <div>
      <h1>All Campgrounds</h1>
      <ul>
        {data.map((camp) => {
          return (
            <li key={camp._id}>
              <Link to={`/campgrounds/${camp._id}`}>{camp.name}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/campgrounds/new">Make New Campground</Link>
    </div>
  );
};

export default Campgrounds;
