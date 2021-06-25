import React from "react";
import Arrivals from "../../components/Arrivals/Arrivals";
import Home from "../../components/Home/Home";
import "./styles.scss";
function Homepage() {
  return (
    <main className="main">
      <Home />
      <Arrivals />
    </main>
  );
}

export default Homepage;
