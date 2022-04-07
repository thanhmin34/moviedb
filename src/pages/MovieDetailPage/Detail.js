import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import HeaderMovie from "../../Component/HeaderMovie";
import { fetcher } from "../../config";
import {
  AiFillStar,
  AiFillCalendar,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import Similar from "./Similar";
import { FilterProvider } from "../Movies/context-filter";
import Loading from "../../loading/Loading";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Config";

const Detail = () => {
  const { movieId } = useParams();

  return (
    <FilterProvider>
      <div className="flex flex-col mx-[7vw]">
        <HeaderMovie />
        <div className="flex gap-6 m:flex-col">
          <VideoDetail
            url={`https://api.themoviedb.org/3/movie/${movieId}?api_key=92f81e121c32d0b9ad19e4e7851187ca`}
          />
          <Similar
            url={`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=92f81e121c32d0b9ad19e4e7851187ca`}
          />
        </div>
      </div>
    </FilterProvider>
  );
};

function MovieVideo({ id }) {
  return (
    <>
      <div className="mt-6 pt-[56%] relative">
        <iframe
          className="absolute top-0 left-0 right-0 w-full h-full object-cover"
          src={`https://www.2embed.ru/embed/imdb/movie?id=${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

function Comments() {
  return (
    <div className="comments mt-10 mb-8 m:mb-0">
      <h2 className="text-4xl font-medium mb-10">Comments</h2>
      <div className="flex items-center rounded-[20px] border border-primary p-2 ">
        <div className="rounded-full w-6 h-6">
          <img
            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex">
          <span className="text-[16px] ml-4">
            You need to{" "}
            <Link className="text-primary" to={"/login"}>
              Sign in
            </Link>{" "}
            to comment
          </span>
        </div>
      </div>

      <div className="blockChat mt-6 mb-10 flex  ">
        <div className="avatar w-10 h-10 rounded-full">
          <img
            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col justify-start flex-1 ml-2 text-[14px]">
          <div className="name flex items-end">
            <span className="text-[16px]">Hoang</span>
            <span className="text-[12px] ml-2">6 day</span>
          </div>
          <div className="contentChat text-[14px]">
            Phim hay lam nhưng làm ơn làm cái comment hộ tôi
          </div>
          <div className="flex items-center justify-start text-[20px] ">
            <span className="mr-2">
              <AiFillLike />
            </span>
            <AiFillDislike />
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoDetail({ url }) {
  const { movieId } = useParams();

  const { data, error } = useSWR(url, fetcher);

  const loading = !data && !error;
  if (!data) return loading;
  const { imdb_id } = data;
  const colRef = collection(db, "flim");
  addDoc(colRef, data);

  if (!data?.genres) return null;
  return (
    <div className="flex flex-col flex-grow-1 items-stretch">
      {loading && <SkeletonVideo />}

      {!loading && (
        <div className="flex flex-col">
          <MovieVideo id={imdb_id} />
          <div className="content ">
            <h2 className="text-4xl font-medium mt-4 mb-2 l:text-3xl">
              {data.title}
            </h2>
            <div className="flex">
              <div className="flex items-center">
                <span className="mr-1">
                  <AiFillStar />
                </span>
                <span>{data.vote_average}</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-1">
                  <AiFillCalendar />
                </span>
                <span>{new Date(data.release_date).getFullYear()}</span>
              </div>
            </div>
            <div className="genres flex items-center my-3 ">
              {data.genres.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="border border-basic py-[5px] px-4 mobiS:px-1 mobiS:py-[2px] rounded-lg mr-2"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="text-[16px]">{data.overview}</div>
          </div>
          <Comments />
        </div>
      )}
    </div>
  );
}
function SkeletonVideo() {
  return (
    <div className="flex flex-col flex-grow-1 items-stretch">
      <div className="flex flex-col w-full">
        <div className="mt-6 pt-[56%] relative">
          <div className="absolute top-0 left-0 right-0 w-full h-full object-cover">
            <Loading width="100%" height="100%" />
          </div>
        </div>
        <div className="content ">
          <h2 className="text-4xl font-medium mt-4 mb-2 l:text-3xl">
            <Loading width="100px" height="20px" />
          </h2>

          <Loading width="120px" height="20px" />
        </div>
      </div>
    </div>
  );
}
export default Detail;
