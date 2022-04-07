import React from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import InputSearch from "../../Component/InputSearch";
import { fetcher, movieApi } from "../../config";
import Loading from "../../loading/Loading";
const SideBarSearch = () => {
  return (
    <div className=" flex-shrink-0 py-6 pr-8 sticky top-0 w-[330px]  xl:w-[320px] h-screen  xl:px-4 l:w-[275px] m:hidden">
      <InputSearch />

      <TopSearch title="Top Searched" url="upcoming" />
      <TopSearch title="Poplar" url="popular" />
    </div>
  );
};

export function TopSearch({ title, url, w = "", h = "h-[220px]" }) {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${url}?api_key=92f81e121c32d0b9ad19e4e7851187ca`,
    fetcher
  );
  const loading = !data && !error;

  const movie = data?.results || [];

  return (
    <>
      {loading && <SkeletonSibar />}
      {!loading && (
        <div className="mt-5 px-8 xl:px-0">
          <h3 className="text-xl mb-4">{title}</h3>
          <div
            className={`flex flex-col overflow-x-hidden overflow-y-auto ${w}  ${h} scrollbar`}
          >
            {movie.length > 0 &&
              movie.map((item) => <Item key={item.id} item={item} />)}
          </div>
        </div>
      )}
    </>
  );
}

export function Item({ item }) {
  const { poster_path, title, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-2 ml-1">
      <div
        className="flex flex-row cursor-pointer hover:opacity-80"
        onClick={() => navigate(`/movie/${id}`)}
      >
        <div className="w-24 h-14 mr-2 rounded-lg ">
          <img
            src={movieApi.getImgage(poster_path)}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h4 className="text-[14px] flex-1 text-overflow-2 py-1">{title}</h4>
      </div>
    </div>
  );
}

function SkeletonSibar() {
  return (
    <div className="mt-5 px-8 xl:px-0">
      <h3 className="text-xl mb-4">
        <Loading height="28px" width="120px" />
      </h3>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto scrollbar">
        {new Array(3).fill(0).map((item, index) => (
          <div key={index} className="flex flex-col py-2 ml-1">
            <div className="flex flex-row cursor-pointer">
              <div className="w-24 h-14 mr-2 rounded-lg ">
                <div className="w-full h-full object-cover rounded-lg">
                  <Loading width="96px" height="56px" />
                </div>
              </div>
              <h4 className="text-[14px] flex-1 text-overflow-2 py-1">
                <Loading height="14px" width="100px" />
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SideBarSearch;
