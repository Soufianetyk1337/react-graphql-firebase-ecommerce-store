/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import "./styles.scss";
import "./HeaderStyle.scss";
import "boxicons";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSignOutUserStart } from "../../redux/User/userSagas";
import { auth } from "../../firebase/utils";
import { selectCartItemsQuantity } from "./../../redux/Cart/cartSelectors";
import { signOutUserStart } from "../../redux/User/userActions";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalQuantity: selectCartItemsQuantity(state),
});

function Header() {
  const { currentUser, totalQuantity } = useSelector(mapState);
  const dispatch = useDispatch();
  const signOut = () => dispatch(signOutUserStart());
  const [toggle, setToggle] = useState(false);
  return (
    <header className="header" id="header">
      <nav className="navigation gridBody">
        <a href="/" className="navigation__logo">
          Valenciaga
        </a>

        <div
          className={`${
            toggle ? "navigation__menu showMenu" : "navigation__menu"
          }`}
          id="navigation-menu"
        >
          <ul className="navigation__list">
            {currentUser && [
              <li className="navigation__ittem">
                <Link to="/cart" className="navigation__link">
                  <i className="bx bx-cart navigation__cart">
                    <span className="total-quantity">{totalQuantity}</span>
                  </i>
                </Link>
              </li>,
              <li className="navigation__item" key="home">
                <Link to="/" className="navigation__link">
                  Home
                </Link>
              </li>,
              <li key="dashboard" className="navigation__item">
                <Link to="/dashboard" className="navigation__link">
                  My Account
                </Link>
              </li>,
              <li className="navigation__item" key="search">
                <Link to="/search" className="navigation__link">
                  Search
                </Link>
              </li>,
              <li key="logout" className="navigation__item">
                <span
                  className="navigation__link "
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </span>
              </li>,
            ]}
            {!currentUser && [
              <li key="registration" className="navigation__item">
                <Link to="/registration" className="navigation__link">
                  Register
                </Link>
              </li>,
              <li key="login" className="navigation__item">
                <Link to="/login" className="navigation__link">
                  Login
                </Link>
              </li>,
            ]}
          </ul>
        </div>

        <div className="icons">
          <i
            className="bx bx-menu navigation__toggle"
            id="nav-toggle"
            onClick={() => {
              setToggle(!toggle);
            }}
          ></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
