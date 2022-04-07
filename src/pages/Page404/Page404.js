import React from "react";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div className="flex mx-[7vw]  s:mx-[4vw]">
      <div className="flex flex-col mt-10 items-center justify-center flex-1 ">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-3xl font-medium s:text-xl mb-6">
          Trang Không có trên Website
        </h2>
        <Link
          to={"/"}
          className="px-2 py-1 border border-primary rounded-lg cursor-pointer bg-primary"
        >
          Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Page404;
