import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout({ currentUser, children, name }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="main">{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
