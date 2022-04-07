import React from "react";
import { Logo } from "../pages/Homepage/SideBarMenu";

export default function Logos({ title }) {
  //   const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-start  ml-2 cursor-pointer xl:mt-2"
      //   onClick={() => navigate("/")}
    >
      <Logo w="w-6" h="h-6" />
      <span className="text-xl font-medium xl:hidden s:block ">{title}</span>
    </div>
  );
}
