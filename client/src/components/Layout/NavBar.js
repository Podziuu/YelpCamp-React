import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-[#2F3237] text-white px-4 py-4 sticky top-0 w-full mb-6">
      <NavLink to="/" className="text-xl" href="/">
        YelpCamp
      </NavLink>
      <ul className="flex w-1/3 justify-between">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "underline" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "underline" : "")}
            exact='true'
            to="/campgrounds"
          >
            Campgrounds
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/campgrounds/new"
            className={({ isActive }) => (isActive ? "underline" : "")}
            exact='ture'
          >
            New Campground
          </NavLink>
        </li>
      </ul>
      <div></div>
    </nav>
  );
};

export default NavBar;
