import React from "react";
import "./ArrivalsStyle.scss";
const ImageLink = `https://github.com/bedimcode/responsive-ecommerce-website/blob/master/assets/img/
`;
function Arrivals() {
  return (
    <section className="section arrivals" id="arrivals">
      <h2 className="section-title">NEW ARRIVALS</h2>
      <a href="/arrivals" className="section-all">
        View All
      </a>
      <div className="arrivals__container bd-grid">
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new1.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new2.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new3.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new4.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new5.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
        <div className="arrivals__box">
          <img
            src={`${ImageLink}new6.png?raw=true`}
            alt="Laptop backpack "
            className="arrivals__image"
          />
          <div className="arrivals__link">
            <a href="/view" className="button">
              VIEW PRODUCT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Arrivals;
