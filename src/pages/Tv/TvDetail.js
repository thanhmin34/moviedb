import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderMovie from "../../Component/HeaderMovie";
import { FilterProvider } from "../Movies/context-filter";
import VideoDetail from "../MovieDetailPage/Detail";
import Similar from "../MovieDetailPage/Similar";
import Detail from "../MovieDetailPage/Detail";
import { AiFillCalendar, AiFillStar } from "react-icons/ai";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Comments } from "../MovieDetailPage/MovieDetailPage";
const TvDetail = () => {
  const { tvId } = useParams();
  return (
    <FilterProvider>
      <div className="flex flex-col mx-[7vw]">
        <HeaderMovie />
        <div className="flex gap-6 m:flex-col ">
          <Tv />
          <Similar
            url={`https://api.themoviedb.org/3/tv/${tvId}/similar?api_key=92f81e121c32d0b9ad19e4e7851187ca`}
          />
        </div>
      </div>
    </FilterProvider>
  );
};

function Tv() {
  const { tvId } = useParams();
  // console.log(tvId);
  const [url, setUrl] = useState(
    `https://www.2embed.ru/embed/tmdb/tv?id=${tvId}&s=1&e=1`
  );

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=92f81e121c32d0b9ad19e4e7851187ca`,
    fetcher
  );
  const hanldeClick = (index) => {
    setUrl(`https://www.2embed.ru/embed/tmdb/tv?id=${tvId}&s=1&e=${index + 1}`);
  };
  const loading = !data && !error;
  if (!data) return loading;
  const {
    id,
    name,
    original_name,
    vote_average,
    first_air_date,
    overview,
    genres,
    number_of_episodes,
  } = data;
  console.log(data);
  if (!genres) return loading;

  // console.log(data);
  return (
    <div className="flex flex-col flex-grow-1 items-stretch">
      <div className="flex flex-col">
        <div className="mt-6 pt-[56%] relative">
          <iframe
            className="absolute top-0 left-0 right-0 w-full h-full object-cover"
            src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=1&e=1`}
            title="the movies"
            allowFullScreen
          ></iframe>
        </div>
        <div className="content ">
          <h2 className="text-4xl font-medium mt-4 mb-2 l:text-3xl">
            {name || original_name}
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
              <span>{new Date(first_air_date).getFullYear()}</span>
            </div>
          </div>
          <div className="genres flex items-center my-3 ">
            {genres.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="border border-basic py-[5px] px-4 mobiS:px-1 mobiS:py-[2px] rounded-lg mr-2"
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="text-[16px]">{overview}</div>
        </div>
        {/* <Episodes hanldeSeleted={hanldeSeleted} /> */}
        <div className="my-4">
          <h3 className="">Episodes</h3>
          <div className="flex gap-3 overflow-auto w-full cursor-pointer  max-w-[92vw] md:max-w-[calc(86vw-350px)] scrollbars ">
            {new Array(number_of_episodes).fill(0).map((item, index) => (
              <span
                onClick={() => hanldeClick(index)}
                className="px-4 py-1 bg-[#27282e] "
                key={index}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
}

// function Episodes({ hanldeSeleted }) {
//   const { tvId } = useParams();
//   const { data } = useSWR(
//     `https://api.themoviedb.org/3/tv/${tvId}?api_key=92f81e121c32d0b9ad19e4e7851187ca`,
//     fetcher
//   );

//   if (!data) return null;
//   const { number_of_episodes } = data;
//   return (
//     <div className="my-4">
//       <h3 className="">Episodes</h3>
//       <div className="flex gap-3 overflow-auto w-full cursor-pointer  max-w-[92vw] md:max-w-[calc(88vw-300px)] scrollbars ">
//         {new Array(number_of_episodes).fill(0).map((item, index) => (
//           <span
//             onClick={() => hanldeSeleted(index)}
//             className="px-4 py-1 bg-[#27282e] "
//             key={index}
//           >
//             {index + 1}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
// function VideoTv({ id, espisodes }) {
//   const [url, setUrl] = useState(
//     `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=1&e=1`
//   );
//   console.log(espisodes);

//   useEffect(() => {
//     setUrl(`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=1&e=${espisodes}`);
//   }, [url]);

//   console.log(url);
//   return (
//     <div className="mt-6 pt-[56%] relative">
//       <iframe
//         className="absolute top-0 left-0 right-0 w-full h-full object-cover"
//         // src={url}
//         src="https://www.youtube.com/embed/Kwg_J99qQUI"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }
export default TvDetail;
