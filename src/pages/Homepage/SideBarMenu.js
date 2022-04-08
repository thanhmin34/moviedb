import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaFilm, FaHistory, FaSearch } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiTv } from "react-icons/bi";
import { useShow } from "../../hooks/toggle-context";
import Logos from "../../Component/Logos";
// import { useContextToggle } from "../../hooks/ContextToggle";

const list = [
  {
    id: 1,
    icon: <FaHome />,
    title: "Home",
    address: "/moviedb",
  },
  {
    id: 2,
    icon: <FaFilm />,
    title: "Movies",
    address: "/movies",
  },
  {
    id: 3,
    icon: <BiTv />,
    title: "Tv",
    address: "/tv",
  },
  {
    id: 4,
    icon: <FaHistory />,
    title: "History",
    address: "/history",
  },

  {
    id: 5,
    icon: <FaSearch />,
    title: "Search",
    hidden: "hidden",
    address: "/search-movies",
  },
  {
    id: 6,
    icon: <FiLogIn />,
    title: "Log in",
    hidden: "",
    address: "/login",
  },
];

const SideBarMenu = () => {
  const { value: showMenu } = useShow();

  return (
    <div
      className={`flex-shrink-0 flex flex-col py-8 pl-8 xlmin:pl-2 sticky top-0 sm:w-[220px] 3xlmin:w-[250px] 3xlmin:pl-4 h-screen  xl:w-[80px] xl:pl-3 border-[1px] 4x:pl-8  border-[#1f2836] s:w-[100%] s:bg-[#191a1f] s:z-10  s:fixed ${
        showMenu === true ? "s:translate-x-[0]" : "s:translate-x-[-100%]"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <Logos title="FilmHay" />
        <span className="mr-8 cursor-pointer text-xl mt-2 sm:hidden ">X</span>
      </div>

      <div className="Menu text-white mt-10 ml-2 xl:mt-0 s:mt-10 s:opacity-70">
        <h2 className="text-md xl:hidden s:block">MENU</h2>
        <ul className="mt-4 xl:mt-2">
          {list.length > 0 &&
            list.map((item) => <Item key={item.id} value={item} />)}
          {/* <Item2 title="Log in" icon={<FaFilm />} /> */}
        </ul>
      </div>
    </div>
  );
};

export function Logo({ w, h }) {
  return (
    <div className={`flex mr-2 ${w} ${h}`}>
      <img
        className="w-full h-full object-cover"
        src="https://filmhot.live/icon.png"
        alt=""
      />
    </div>
  );
}

function Item({ value }) {
  const { icon, title, hidden = "", address } = value;

  return (
    <NavLink to={`${address}`}>
      <ul
        className={`flex justify-start items-center py-2 pr-2 text-xl cursor-pointer hover:text-[#ccc] sm:${hidden}  xl:text-2xl `}
      >
        {icon}
        <span className="ml-4 text-sm xl:hidden s:block">{title}</span>
      </ul>
    </NavLink>
  );
}

export default SideBarMenu;
