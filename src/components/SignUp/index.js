/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import "./SignUpStyle.scss";
import { useEffect, useState } from "react";
import AuthWrapper from "../AuthWrapper";
import { useHistory } from "react-router-dom";
import { signUpUser } from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError,
});
function SignUp(props) {
  const { userError, currentUser } = useSelector(mapState);
  const handleSubmit = (values) => {
    dispatch(signUpUser({ ...values }));
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const [initialState, setInitialState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      setInitialState({
        ...initialState,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      history.push("/");
    }
  }, [currentUser, initialState, history, dispatch]);

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setInitialState({
        ...initialState,
        errors: userError,
      });
    }
  }, [userError]);
  return (
    <AuthWrapper headline="Sign Up">
      <div className="formWrapper">
        <Formik
          initialValues={{ ...initialState }}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            displayName: Yup.string()
              .required("Enter your full name")
              .min(10, "Full Name too short - should be 10 chars min")
              .matches(
                /[a-zA-z]/,
                "Full name should only contain latin Letters"
              ),
            email: Yup.string().email().required("Required"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
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
                <label htmlFor="fullName" style={{ display: "block" }}>
                  Full Name
                </label>
                <input
                  id="displayName"
                  placeholder="Enter your full name"
                  type="text"
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.displayName && touched.displayName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.displayName && touched.displayName && (
                  <div className="input-feedback">{errors.displayName}</div>
                )}
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
                <label htmlFor="confirmPassword" style={{ display: "block" }}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
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
                  Register
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
