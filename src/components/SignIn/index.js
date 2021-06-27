/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./SignInStyle.scss";
import AuthWrapper from "./../AuthWrapper";
import { Link, useHistory } from "react-router-dom";
import {
  resetAllAuthForms,
  signInUser,
  signInWithGoogle,
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError,
});
function SignIn(props) {
  const handleSubmit = async (values) => {
    const { email, password } = values;
    dispatch(emailSignInStart({ email, password }));
  };
  const { currentUser, userError } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(userError);

  useEffect(() => {
    if (currentUser) {
      setPassword("");
      setEmail("");
      history.push("/");
    }
    return () => {};
  }, [currentUser, history, dispatch]);
  const handeGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };
  return (
    <AuthWrapper headline="Sign In">
      <div className="formWrapper">
        <Formik
          initialValues={{ email, password }}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form className="signin-form" onSubmit={handleSubmit}>
                <label htmlFor="email" style={{ display: "block" }}>
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
                <label htmlFor="password" style={{ display: "block" }}>
                  Password
                </label>
                <input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                {Array.isArray(userError) &&
                  userError.length > 0 &&
                  !isSubmitting && (
                    <div className="input-feedback">{userError}</div>
                  )}
                <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
                <button type="button" onClick={handeGoogleSignIn}>
                  Google Signin
                </button>
                <Link
                  to="recovery"
                  className="reset-link"
                  rel="noopener noreferrer"
                >
                  Forgot Password?{" "}
                </Link>
                <DisplayFormikState {...props} />
              </form>
            );
          }}
        </Formik>
      </div>
    </AuthWrapper>
  );
}
const DisplayFormikState = (props) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
export default SignIn;
