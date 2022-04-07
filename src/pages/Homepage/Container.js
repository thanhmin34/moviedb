import React, { useState } from "react";
import MoviesList from "../../Component/MoviesList";
import Banner from "../../Component/Banner";
import MenuMobile from "../../Component/MenuMobile";

const Container = () => {
  return (
    <div className="flex-grow px-8 w-[300px]  lg:w-[550px] md:[600px] sm:w-[400px] xlmin:w-[768px]   4xlmin:w-[800px] xlmin:px-4 3xl:px-4 3xlmin:px-8  xl:px-4 mt-8 s:mt-2 ">
      <MenuMobile />
      <Banner />
      <MoviesList title="Now Playing" url="now_playing" />
      <MoviesList title="Top Rated" url="top_rated" />
      <MoviesList title="Popular" url="popular" />
    </div>
  );
};

export default Container;
