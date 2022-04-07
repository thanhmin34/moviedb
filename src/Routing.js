import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Homepage/Home"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const Detail = lazy(() => import("./pages/MovieDetailPage/Detail"));
const Page404 = lazy(() => import("./pages/Page404/Page404"));
const Tv = lazy(() => import("./pages/Tv/Tv"));
const Login = lazy(() => import("./pages/Login/Login"));
const TvDetail = lazy(() => import("./pages/Tv/TvDetail"));
const Search = lazy(() => import("./Component/Search"));
const History = lazy(() => import("./pages/history/History"));
const Routing = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full  mt-10 mx-auto flex items-center justify-center">
          <span className=" w-10 h-10 border-4 border-primary border-l-transparent animate-spin  rounded-full  "></span>
        </div>
      }
    >
      <Routes>
        <Route path="/moviedb" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movie/:movieId" element={<Detail />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/tv/:tvId" element={<TvDetail />}></Route>
        <Route
          path="/history"
          element={
            <>
              {" "}
              <History />
            </>
          }
        ></Route>
        <Route path="/search-movies" element={<Search />}></Route>
        <Route path="/search-movies/:slug" element={<Search />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
