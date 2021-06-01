/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.scss";
import brandLogo from "./../../assets/clothing-brand-logo.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSignOutUserStart } from "../../redux/User/userSagas";
import { auth } from "../../firebase/utils";
import { selectCartItemsQuantity } from "./../../redux/Cart/cartSelectors";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalQuantity: selectCartItemsQuantity(state),
});

function Header() {
  const { currentUser, totalQuantity } = useSelector(mapState);
  const dispatch = useDispatch();
  // const signOut = () => dispatch(onSignOutUserStart());

  return (
    <header className="header">
      <div className="wrapper">
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
      </div>
    </header>
  );
}

export default Header;
