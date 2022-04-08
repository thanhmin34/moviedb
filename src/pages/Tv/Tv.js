import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import HeaderMovie from "../../Component/HeaderMovie";
import { fetcher, movieApi } from "../../config";
import useDebounce from "../../hooks/useDebounce";
import { useFilter, FilterProvider } from "../Movies/context-filter";
import { ItemMovie } from "../Movies/Movies";
import { HoverLay } from "../../Component/MovieItem";
const itemsPerPage = 1;
const Tv = () => {
  return (
    <div>
      <FilterProvider>
        <div className="flex flex-col items-stretch h-screen mx-[7vw]">
          <HeaderMovie />
          <SerisfTv />
        </div>
      </FilterProvider>
    </div>
  );
};

const SerisfTv = () => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [next, setNext] = useState(1);
  const { filter } = useFilter();
  const filterDebounce = useDebounce(filter, 700);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=92f81e121c32d0b9ad19e4e7851187ca&page=${next}`
  );
  const { data, error } = useSWR(url, fetcher);
  const tvs = data?.results || [];
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/tv?api_key=92f81e121c32d0b9ad19e4e7851187ca&query=${filterDebounce}&page=${next}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=92f81e121c32d0b9ad19e4e7851187ca&page=${next}`
      );
    }
  }, [filterDebounce, next]);
  useEffect(() => {
    if (!data || !data.total_pages) return null;
    const endOffset = itemOffset + itemsPerPage;

    setPageCount(Math.ceil(data.total_pages / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
  const hanldeClick = (index) => {
    setNext((prev) => index + 1);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setNext(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className=" flex items-center text-xl">
        <span
          className={` mr-4 cursor-pointer`}
          onClick={() => navigate("/movies")}
        >
          Movies
        </span>
        <span className={` mr-4 cursor-pointer text-active`}>Tv Series</span>
      </div>
      <div className="py-4 grid grid-cols-2 min:grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xlmin:grid-cols-6">
        {tvs.length > 0 &&
          tvs.map((tv) => (
            <div
              key={tv.id}
              className="bg-basic rounded-lg cursor-pointer relative items-movie"
              onClick={() => navigate(`/tv/${tv.id}`)}
            >
              <div className="relative pb-[144%]">
                <img
                  src={`${movieApi.getImgage(tv.poster_path)}`}
                  alt=""
                  className="absolute top-0 right-0 left-0 object-cover h-full w-full rounded-top"
                />
              </div>
              <span className="text-overflow-1 py-1 px-2 text-center">
                {tv.name}
              </span>
              <HoverLay />
            </div>
          ))}
      </div>
      <div className="py-10 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </>
  );
};
export default Tv;
