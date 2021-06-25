import React from "react";
const ImageLink = `https://github.com/bedimcode/responsive-ecommerce-website/blob/master/assets/img/
`;
function Home() {
  return (
    <section className="homepage" id="homepage">
      <div className="homepage__container bd-grid">
        <div className="homepage__data">
          <h1 className="homepage__title">
            NEW <br />
            <span>ARRIVALS</span>
          </h1>
          <a href="#featured" className="button">
            GO SHOPPING
          </a>
        </div>
        <img
          src={`${ImageLink}home.png?raw=true`}
          alt="Homepage"
          className="homepage__image"
        />
      </div>
    </section>
  );
}

export default Home;
