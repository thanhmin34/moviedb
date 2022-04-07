import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/scss";
import "swiper/css/navigation";
import MovieItem from "./MovieItem";
import { fetcher, movieApi } from "../config";
import Loading from "../loading/Loading";

const MoviesList = ({ title, url }) => {
  const { data, error } = useSWR(movieApi.getMovie(url), fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <>
      {!data && <SkeletonMovies />}
      <div className="mt-10">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="movie-list mt-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            breakpoints={{
              900: {
                width: 900,
                slidesPerView: 5,
              },
              800: {
                width: 800,
                slidesPerView: 5,
              },
              768: {
                width: 768,
                slidesPerView: 3,
              },
              540: {
                width: 540,
                slidesPerView: 2,
              },
              400: {
                width: 400,
                slidesPerView: 1,
              },
              250: {
                width: 250,
                slidesPerView: 1,
              },
            }}
          >
            {movies.length > 0 &&
              movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieItem movie={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

function SkeletonMovies() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-medium">
        <Loading height="30px" width="140px" />
      </h2>
      <div className="movie-list mt-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          breakpoints={{
            900: {
              width: 900,
              slidesPerView: 5,
            },
            800: {
              width: 800,
              slidesPerView: 5,
            },
            768: {
              width: 768,
              slidesPerView: 3,
            },
            540: {
              width: 540,
              slidesPerView: 2,
            },
            400: {
              width: 400,
              slidesPerView: 1,
            },
            250: {
              width: 250,
              slidesPerView: 1,
            },
          }}
        >
          {new Array(20).fill(0).map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" bg-basic rounded-lg p-2 cursor-pointer">
                <div className="relative pt-[127%] rounded-lg">
                  <div className="absolute w-full h-full top-0 left-0 right-0  rounded-lg object-cover">
                    <Loading />
                  </div>
                </div>
                <span className="text-[14px] text-center  pt-2 pb-1 text-overflow-1">
                  <Loading />
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MoviesList;
