import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useFilter } from "../pages/Movies/context-filter";

const HeaderMovie = () => {
  const navigate = useNavigate();
  const { filter, hanldeFilterChange } = useFilter();

  return (
    <div className="flex my-8 items-center justify-between cursor-pointer w-full">
      <div onClick={() => navigate("/")} className={`flex mr-2 w-8 h-8 `}>
        <img
          className="w-full h-full object-cover"
          src="https://filmhot.live/icon.png"
          alt=""
        />
        <span className="ml-2 text-xl ">FilmHay</span>
      </div>
      <button
        className="text-xl mr-1 hidden s:block"
        onClick={() => navigate("/search-movies")}
      >
        <FiSearch />
      </button>
      <div className="search flex items-center justify-center s:hidden sm:block">
        <div className="flex border-[1px] border-basic px-2   py-[6px] rounded-[20px] ">
          <input
            type="text"
            className="bg-transparent border-none outline-none px-2  text-[14px]"
            id="search"
            value={filter}
            onChange={hanldeFilterChange}
          />
          <button className="text-xl">
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMovie;
