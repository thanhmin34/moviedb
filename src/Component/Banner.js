import React, { useState } from "react";
import useSWR from "swr";
import { Navigation, Pagination, Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher, movieApi } from "../config";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
const Banner = () => {
  const { data, error } = useSWR(movieApi.getMovie("popular"), fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];

  return (
    <div className="mt-4">
      {loading && <SkeletonBanner />}
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        grabCursor={"true"}
        slidesPerView={"auto"}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        // navigation
        // pagination={{ clickable: true }}
      >
        {movies.length > 0 &&
          movies
            // .slice(0, 1)
            .map((movie) => (
              <SwiperSlide key={movie.id}>
                <Item movie={movie} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

function SkeletonBanner() {
  return (
    <div className="flex pt-[42%] relative rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 w-full h-full object-cover rounded-lg opacity-70">
        <Loading />
      </div>

      <h3 className="absolute bottom-4 left-8 text-[12px] md:text-[14px] sm:text-[20px] lg:text-[25px] banner-content "></h3>
    </div>
  );
}

function Item({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex pt-[42%] relative rounded-lg overflow-hidden"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`${movieApi.getSlider(movie.backdrop_path)}`}
        alt=""
        className="absolute top-0 left-0 right-0 w-full h-full object-cover rounded-lg opacity-70"
      />
      <h3 className="absolute bottom-4 left-8 text-[12px] md:text-[14px] sm:text-[20px] lg:text-[25px] banner-content ">
        {movie.title}
      </h3>
    </div>
  );
}
export default Banner;
