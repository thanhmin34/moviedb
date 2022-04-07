import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.production.min";
import { movieApi } from "../config";
const MovieItem = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" bg-basic rounded-lg p-2 cursor-pointer relative items-movie transition-all duration-200"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative pt-[127%] rounded-lg">
        <img
          src={`${movieApi.getImgage(movie.poster_path)}`}
          className="absolute w-full h-full top-0 left-0 right-0  rounded-lg object-cover"
        />
      </div>
      <p className="text-[14px] text-center  pt-2 pb-1 text-overflow-1">
        {movie.title}
      </p>
      <HoverLay />
    </div>
  );
};

export function HoverLay() {
  return (
    <div className="play">
      <div>
        <span></span>
      </div>
    </div>
  );
}
export default MovieItem;
