import React from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import HeaderMovie from "../../Component/HeaderMovie";
import { HoverLay } from "../../Component/MovieItem";
import { fetcher, movieApi } from "../../config";
import { FilterProvider } from "./context-filter";
import Movie from "./Movie";

const Movies = () => {
  return (
    <div className="flex flex-col items-stretch h-screen mx-[7vw]">
      <HeaderMovie />

      <Movie />
    </div>
  );
};

export function ItemMovie({ item, type = "" }) {
  const { title, poster_path, id, name } = item;

  const navigate = useNavigate();
  return (
    <div
      className="bg-basic rounded-lg relative cursor-pointer items-movie"
      onClick={() => navigate(`${type}${id}`)}
    >
      <div className="relative pb-[144%]">
        <img
          src={`${movieApi.getImgage(poster_path)}`}
          alt=""
          className="absolute top-0 right-0 left-0 object-cover h-full w-full rounded-top"
        />
      </div>
      <span className="text-overflow-1 py-1 px-2 text-center">
        {title || name}
      </span>
      <HoverLay />
    </div>
  );
}
export default Movies;
