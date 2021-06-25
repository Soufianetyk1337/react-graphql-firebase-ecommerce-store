import React from "react";
import "./design.scss";
import "boxicons";
import { useState } from "react";
function Commerce() {
  const handleMenuToggle = () => {
    setToggle(!toggle);
  };
  const [toggle, setToggle] = useState(false);
  const ImageLink = `https://github.com/bedimcode/responsive-ecommerce-website/blob/master/assets/img/
`;
  return (
    <>
      <header className="header">
        <nav className="navigation bd-grid">
          <div>
            <a href="/" className="navigation__logo">
              Sara
            </a>
          </div>
          <div
            className={
              toggle ? "showMenu navigation__menu" : "navigation__menu"
            }
            id="nav-menu"
          >
            <ul className="navigation__list">
              <li className="navigation__item">
                <a href="#home" className="navigation__link active">
                  Home
                </a>
              </li>
              <li className="navigation__item">
                <a href="#featured" className="navigation__link">
                  Featured
                </a>
              </li>
              <li className="navigation__item">
                <a href="#new" className="navigation__link">
                  New
                </a>
              </li>
              <li className="navigation__item">
                <a href="#subscribed" className="navigation__link">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
          <div className="icons">
            <i className="bx bx-cart navigation__cart"></i>
            <i
              className="bx bx-menu navigation__toggle"
              id="nav-toggle"
              onClick={handleMenuToggle}
            ></i>
          </div>
        </nav>
      </header>
      <main className="main">
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
        <section className="collection section" id="collection">
          <div className="collection__container">
            <div className="collection__container bd-grid">
              <div className="collection__box">
                <img
                  src={`${ImageLink}backpackMan.png?raw=true`}
                  alt="Backpack for mens"
                  className="collection__image"
                />
                <div className="collection__data">
                  <h2 className="collection__title">
                    <span className="collection__subtitle">Men</span> <br />
                    Backpack
                  </h2>
                  <a href="/mens" className="collection__view">
                    View collection
                  </a>
                </div>
              </div>
              <div className="collection__box row-reverse bg-gray">
                <img
                  src={`${ImageLink}backpackWoman.png?raw=true`}
                  alt="Backpack for women"
                  className="collection__image"
                />
                <div className="collection__data">
                  <h2 className="collection__title">
                    <span className="collection__subtitle">Women</span> <br />
                    Backpack
                  </h2>
                  <a href="/women" className="collection__view">
                    View collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="featured section" id="featured">
          <h2 className="section-title">FEATURED PRODUCTS</h2>
          <a href="/products" className="section-all">
            View All
          </a>
          <div className="featured__container bd-grid">
            <div className="featured__product">
              <div className="featured__box">
                <div className="featured__new">NEW</div>
                <img
                  src={`${ImageLink}feature1.png?raw=true`}
                  alt="Featured Product Headphones"
                  className="featured__image"
                />
              </div>
              <div className="featured__data">
                <h3 className="featured__name">Headphone One Black</h3>
                <span className="featured__price">$49.99</span>
              </div>
            </div>
            <div className="featured__product">
              <div className="featured__box">
                <div className="featured__new">NEW</div>
                <img
                  src={`${ImageLink}feature2.png?raw=true`}
                  alt="Featured Product Headphones"
                  className="featured__image"
                />
              </div>
              <div className="featured__data">
                <h3 className="featured__name">Speakers Beats Pill</h3>
                <span className="featured__price">$49.99</span>
              </div>
            </div>
            <div className="featured__product">
              <div className="featured__box">
                <div className="featured__new">NEW</div>
                <img
                  src={`${ImageLink}feature3.png?raw=true`}
                  alt="Featured Product Headphones"
                  className="featured__image"
                />
              </div>
              <div className="featured__data">
                <h3 className="featured__name">Apple Airpods</h3>
                <span className="featured__price">$99.99</span>
              </div>
            </div>
            <div className="featured__product">
              <div className="featured__box">
                <div className="featured__new">NEW</div>
                <img
                  src={`${ImageLink}feature4.png?raw=true`}
                  alt="Featured Product Headphones"
                  className="featured__image"
                />
              </div>
              <div className="featured__data">
                <h3 className="featured__name">Smartwatch F9 Negro</h3>
                <span className="featured__price">$49.99</span>
              </div>
            </div>
          </div>
        </section>
        <section className="offer section">
          <div className="offer__background">
            <div className="offer__data">
              <h2 className="offer__title">Special Offer</h2>
              <p className="offer__description">
                Special offers discounts for man this week only
              </p>
              <a href="/offers" className="button">
                SHOP NOW
              </a>
            </div>
          </div>
        </section>
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
        <section className="section sponsors">
          <div className="sponsors__container bd-grid">
            <div className="sponsors__logo">
              <img src={`${ImageLink}logo1.png?raw=true`} alt="sponsors" />
            </div>
            <div className="sponsors__logo">
              <img src={`${ImageLink}logo2.png?raw=true`} alt="sponsors" />
            </div>
            <div className="sponsors__logo">
              <img src={`${ImageLink}logo3.png?raw=true`} alt="sponsors" />
            </div>
            <div className="sponsors__logo">
              <img src={`${ImageLink}logo4.png?raw=true`} alt="sponsors" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Commerce;
/*
https://github.com/bedimcode/responsive-ecommerce-website/blob/master/assets/img/backpackMan.png?raw=true
*/
