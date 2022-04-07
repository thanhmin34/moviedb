import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import useClickOutSide from "../hooks/useClickOutSide";

const InputSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // const [url, setUrl] = useState(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=92f81e121c32d0b9ad19e4e7851187ca`
  // );
  // const { data, error } = useSWR(url, fetcher);
  // useEffect(() => {
  //   if (query) {
  //     setUrl(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=92f81e121c32d0b9ad19e4e7851187ca&query=${query}`
  //     );
  //   } else {
  //     setUrl(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=92f81e121c32d0b9ad19e4e7851187ca`
  //     );
  //   }
  // }, [query]);

  // if (!data) return <div></div>;
  // const search = data.results || [];

  return (
    <div className="search flex items-center justify-center mt-2 ">
      <div
        className={`flex border-[1px] border-basic 2xl:px-2 pl-2 pr-2    py-[4px] rounded-[20px] relative`}
      >
        <input
          type="text"
          className="input-search bg-transparent border-none outline-none px-2  text-[14px] "
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => navigate(`/search-movies/${query}`)}
          className="text-xl mr-1"
        >
          <FiSearch />
        </button>

        {/* <div className="flex flex-col absolute top-[32px] left-0 right-0 bg-[#333] none h-[200] overflow-hidden">
          {search.length > 0 &&
            search.map((item) => (
              <span key={item.id} className="py-1 px-2 ">
                {item.title || item.name}
              </span>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default InputSearch;
