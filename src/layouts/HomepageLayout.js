/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HomepageLayout({ currentUser, children, name }) {
  return (
    <div className="fullheight">
      <Header currentUser={currentUser} />
      {/* {children} */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default HomepageLayout;
