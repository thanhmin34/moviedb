import React from "react";
import { MenuShow, ToggleProvider } from "../../hooks/toggle-context";

import Container from "./Container";
import SideBarMenu from "./SideBarMenu";
import SideBarSearch from "./SideBarSearch";

const Home = () => {
  return (
    <ToggleProvider>
      <div className="w-full flex ">
        <SideBarMenu />

        <Container />

        <SideBarSearch />
      </div>
    </ToggleProvider>
  );
};

export default Home;
