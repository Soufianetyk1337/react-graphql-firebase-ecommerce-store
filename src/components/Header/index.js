/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.scss";
import brandLogo from "./../../assets/clothing-brand-logo.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onSignOutUserStart } from "../../redux/User/userSagas";
import { auth } from "../../firebase/utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
function Header() {
  const { currentUser } = useSelector(mapState);
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
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
