import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  AiFillStar,
  AiFillCalendar,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import HeaderMovie from "../../Component/HeaderMovie";
import { fetcher } from "../../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=92f81e121c32d0b9ad19e4e7851187ca`,
    fetcher
  );
  if (!data || data.length === 0) return null;
  const { title, release_date, vote_average, overview, genres } = data;

  return (
    <div className="flex flex-col  h-screen mx-[7vw] m:mx-[4vw] ">
      <HeaderMovie />
      <div className="my-6 flex gap-6  items-center">
        <div className="flex flex-col items-stretch flex-grow">
          <Video />
          <div className="content ">
            <h2 className="text-4xl font-medium mt-4 mb-2 l:text-3xl">
              {title}
            </h2>
            <div className="flex">
              <div className="flex items-center">
                <span className="mr-1">
                  <AiFillStar />
                </span>
                <span>{vote_average}</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-1">
                  <AiFillCalendar />
                </span>
                <span>{new Date(release_date).getFullYear()}</span>
              </div>
            </div>
            <div className="genres flex items-center my-3">
              {genres.length > 0 &&
                genres.map((item) => (
                  <div
                    key={item.id}
                    className="border border-basic py-[5px] px-4 rounded-lg mr-2"
                  >
                    {item.name}
                  </div>
                ))}
            </div>
            <div className="text-[16px]">{overview}</div>
          </div>
          <Comments />
        </div>

        <Similar />
      </div>
    </div>
  );
};

function Video() {
  const { movieId } = useParams();
  return (
    <div className="w-full mobiS:w-full">
      <div className="flex pb-[56.25%] w-full  mobiS:w-full relative ">
        <iframe
          src={`https://www.2embed.ru/embed/tmdb/movie?id=${movieId}`}
          title="YouTube video player"
          className="absolute top-0 left-0 right-0 object-cover w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function Similar() {
  return (
    <div className="flex-shrink-0 m:hidden xl:w-[300px] l:w-[220px] lg:w-[250px]">
      Similar movie
    </div>
  );
}

export function Comments() {
  return (
    <div className="comments mt-10 mb-8">
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
          <div className="contentChat text-[14px]">Phim hay lam</div>
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
export default MovieDetailPage;
