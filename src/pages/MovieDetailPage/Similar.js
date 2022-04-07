import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, movieApi } from "../../config";
import Loading from "../../loading/Loading";
import { Item, TopSearch } from "../Homepage/SideBarSearch";

export default function Similar({ url }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  const movie = data?.results || [];
  return (
    <div className="flex-shrink-0 mt-4 m:mt-0  w-full md:w-[250px] xlmin:w-[350px] ml:auto">
      <div className="mt-5 px-8 xl:px-0 w-full">
        <h3 className="text-xl mb-4">Similar movies</h3>
        <div
          className={`flex flex-col overflow-x-hidden overflow-y-auto h-[400px] scrollbar`}
        >
          {/* {console.log(loading)} */}
          {/* {loading && <SkeletonSimilar />} */}
          {/* {console.log(!loading)} */}
          {!loading &&
            movie.length > 0 &&
            movie.map((item) => (
              <div
                key={item.id}
                className="flex flex-col py-2 ml-1 min:flex-col"
              >
                <div
                  className="flex flex-row cursor-pointer hover:opacity-80"
                  onClick={() => navigate(`/movie/${item.id}`)}
                >
                  <div className="w-24 h-14 mr-2 rounded-lg ">
                    <img
                      src={movieApi.getImgage(item.poster_path)}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-[14px] flex-1 text-overflow-2 py-1">
                    {item.title || item.name}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonSimilar() {
  return (
    <>
      {new Array(20).fill(0).map((item, index) => (
        <div key={index} className="flex flex-col py-2 ml-1 min:flex-col">
          <div className="flex flex-row cursor-pointer ">
            <div className="w-24 h-14 mr-2 rounded-lg ">
              <div className="w-full h-full object-cover rounded-lg">
                <Loading />
              </div>
            </div>
            <h4 className="text-[14px] flex-1 py-1">
              <Loading width="100%" height="20px" />
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
