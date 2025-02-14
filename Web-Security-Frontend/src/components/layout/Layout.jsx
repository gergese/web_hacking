import React from "react";
import PropTypes from "prop-types";
import CustomNavBar from "./CustomNavBar";

const Layout = ({ children }) => {
  return (
    <>
      <CustomNavBar />
      <main className="mx-auto flex flex-col items-center px-8 py-8 overflow-auto">
        {children}
      </main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
