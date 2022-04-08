import React from "react";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useShow } from "../hooks/toggle-context";

import { Logo } from "../pages/Homepage/SideBarMenu";

const MenuMobile = () => {
  const navigate = useNavigate();
  const { value, hanldeToggleValue: hanldeShow } = useShow();

  return (
    <div
      onClick={() => navigate("/moviedb")}
      className=" flex justify-between items-center text-4xl py-2 sm:hidden "
    >
      <div className="flex items-center justify-start">
        <Logo w="w-8" h="h-8" />
        <span className="text-xl font-medium">FilmHay</span>
      </div>
      <div className="" onClick={hanldeShow}>
        <BiMenu />
      </div>
    </div>
  );
};

export default MenuMobile;
