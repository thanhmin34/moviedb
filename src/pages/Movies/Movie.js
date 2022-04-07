import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { useFilter } from "./context-filter";
import { ItemMovie } from "./Movies";
import { fetcher, movieApi } from "../../config";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../loading/Loading";
import { useNavigate } from "react-router-dom";
const itemsPerPage = 1;

const Movie = () => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const { filter } = useFilter();
  const debounceFilter = useDebounce(filter, 1000);

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=92f81e121c32d0b9ad19e4e7851187ca&page=${nextPage}`
  );
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  useEffect(() => {
    if (debounceFilter) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=92f81e121c32d0b9ad19e4e7851187ca&query=${debounceFilter}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=92f81e121c32d0b9ad19e4e7851187ca&page=${nextPage}`
      );
    }
  }, [debounceFilter, nextPage]);
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_pages) return null;
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(data.total_pages / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setNextPage(event.selected + 1);
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className=" flex items-center text-xl">
        <span className={`text-active mr-4 cursor-pointer`}>Movies</span>
        <span className={`mr-4 cursor-pointer`} onClick={() => navigate("/tv")}>
          Tv Series
        </span>
      </div>
      {loading && (
        <div className="py-4 grid grid-cols-2 min:grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xlmin:grid-cols-6 ">
          {new Array(20).fill(0).map((item, index) => (
            <SkeletonMovie key={index} />
          ))}
        </div>
      )}
      <div className="py-4 grid grid-cols-2 min:grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xlmin:grid-cols-6">
        {!loading &&
          movies.length > 0 &&
          movies.map((item, index) => (
            <ItemMovie key={index} item={item} type="/movie/" />
          ))}
      </div>

      <div className="py-10 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </>
  );
};

function SkeletonMovie() {
  return (
    <div className="bg-basic rounded-lg">
      <div className="relative pb-[144%]">
        <Loading width="100%" height="100%" borderRadius="8px" />
      </div>
      <span className="text-overflow-1 py-1 px-2 text-center"></span>
    </div>
  );
}

export default Movie;
