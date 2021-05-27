/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./style.scss";
import Button from "./../Forms/Button";
import FormInput from "./../../components/Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";
import { Link, withRouter } from "react-router-dom";
import {
  resetAllAuthForms,
  signInUser,
  signInWithGoogle,
  emailSignInStart,
} from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
function SignIn(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setPassword("");
      setEmail("");
      props.history.push("/");
    }
    return () => {};
  }, [currentUser, props.history, dispatch]);
  const handeGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  console.log(`currentUser`, currentUser);
  return (
    <AuthWrapper headline="Sign In">
      <div className="formWrapper">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="type"
            name="email"
            value={email}
            placeholder="Enter Your Email Address"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Enter Your Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={handeGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="recovery">Reset password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default withRouter(SignIn);
