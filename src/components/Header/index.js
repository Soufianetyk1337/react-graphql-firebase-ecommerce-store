/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./styles.scss";
import "boxicons";

import brandLogo from "./../../assets/clothing-brand-logo.jpg";
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
    <header className="l-header" id="header">
      <nav className="nav bd-grid">
        <div
          className="nav__toggle"
          id="nav-toggle"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <box-icon name="menu-alt-left"></box-icon>
        </div>
        <a href="/" className="nav__logo">
          Valenciaga
        </a>
        <div
          className={`${toggle ? "nav__menu show" : "nav__menu"}`}
          id="nav-menu"
        >
          <ul className="nav__list">
            {currentUser && [
              <li key="dashboard" className="nav__item">
                <Link to="/dashboard" className="nav__link">
                  My Account
                </Link>
              </li>,
              <li key="logout" className="nav__item">
                <span
                  className="nav__link"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </span>
              </li>,
            ]}
            {!currentUser && [
              <li key="registration" className="nav__item">
                <Link to="/registration" className="nav__link">
                  Register
                </Link>
              </li>,
              <li key="login" className="nav__item">
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>,
            ]}

            {/* <li className="nav__item">
              <a href="/" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="/search" className="nav__link">
                Search
              </a>
            </li>
            <li className="nav__item">
              <a href="/" className="nav__link">
                Your Cart
              </a>
            </li>
            <li className="nav__item">
              <a href="/" className="nav__link">
                My Account
              </a>
            </li> */}
          </ul>
        </div>
        <div className="nav__logout">
          <box-icon name="log-out"></box-icon>
        </div>
      </nav>
      {/* <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img src={brandLogo} alt="Clothing brand logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li key="home">
              <Link to="/">Home</Link>
            </li>
            <li key="search">
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            <li key="cart">
              <Link to="/cart">Your Cart ({totalQuantity})</Link>
            </li>
          </ul>
          <ul>
            {currentUser && [
              <li key="dashboard">
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li key="logout">
                <span
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Logout
                </span>
              </li>,
            ]}
            {!currentUser && [
              <li key="registration">
                <Link to="/registration">Register</Link>
              </li>,
              <li key="login">
                <Link to="/login">Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
