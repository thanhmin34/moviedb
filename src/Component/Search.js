import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, movieApi } from "../config";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Loading from "../loading/Loading";
const Search = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const debounceFilter = useDebounce(filter, 1000);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=92f81e121c32d0b9ad19e4e7851187ca`
  );
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (debounceFilter) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=92f81e121c32d0b9ad19e4e7851187ca&query=${debounceFilter}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=92f81e121c32d0b9ad19e4e7851187ca`
      );
    }
  }, [debounceFilter]);

  const movies = data?.results || [];
  return (
    <div className="w-full max-w-[400px] mx-auto mt-6 h-screen px-4">
      <div
        className="flex justify-end text-xl font-bold cursor-pointer"
        onClick={() => navigate("/moviedb")}
      >
        X
      </div>
      <div className="flex flex-col mt-10">
        <h3 className="text-xl font-medium mx-auto my-4 min:text-[16px]">
          Search for your favorite movies
        </h3>
        <div className="flex items-center px-2 mx-auto border border-basic rounded-[20px]">
          <input
            type="text"
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 py-[7px]  px-4 outline-none border-none bg-transparent text-[14px]"
          />
          <span className="flex items-center text-xl font-medium mr-2 cursor-pointer">
            <FiSearch />
          </span>
        </div>
        <div className="movies-list flex flex-col justify-start mb-10">
          <h3 className="text-[16px]  mt-10">Popular Search</h3>
          {loading && (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {!loading &&
            movies.length > 0 &&
            movies.map((item) => <ListMovie key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

function ListMovie({ item }) {
  const navigate = useNavigate();
  const { id, poster_path, title } = item;
  return (
    <div
      className="flex flex-row  min:flex-col mt-4 "
      onClick={() => navigate(`/movie/${id}`)}
    >
      <img
        src={movieApi.getImgage(poster_path)}
        alt=""
        className="  h-[80px] w-[180px] min:w-full min:h-[120px] rounded-lg object-cover"
      />
      <span className="flex-1 items-stretch text-[15px] ml-4 min:ml-0">
        {title}
      </span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-row  min:flex-col mt-4 ">
      <div className="  h-[80px] w-[180px] min:w-full min:h-[120px] rounded-lg object-cover">
        <Loading width="100%" height="100%" borderRadius="8px" />
      </div>
      <span className="flex-1 items-stretch text-[15px] ml-4 min:ml-0">
        <Loading width="100%" height="20px" />
      </span>
    </div>
  );
}
export default Search;
