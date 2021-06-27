import React from "react";
import MenHomepageImage from "./../../assets/HomePageImage.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <section className="homepage" id="homepage">
      <div className="homepage__container bd-grid">
        <div className="homepage__data">
          <h1 className="homepage__title">
            NEW <br />
            <span>ARRIVALS</span>
          </h1>
          <Link to="/registration" className="button">
            GO SHOPPING
          </Link>
        </div>
        <img
          src={MenHomepageImage}
          alt="Homepage"
          className="homepage__image"
        />
      </div>
    </section>
  );
}

export default Home;
