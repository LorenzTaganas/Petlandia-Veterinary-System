import React from "react";
import HomeHeader from "../components/NavigationComponents/HomeHeader";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <HomeHeader />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
