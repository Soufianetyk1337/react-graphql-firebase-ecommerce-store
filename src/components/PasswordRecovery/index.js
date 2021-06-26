/* eslint-disable no-unused-vars */
import "./PasswordRecoveryStyle.scss";
import AuthWrapper from "../AuthWrapper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userError: user.userError,
});

function PasswordRecovery(props) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { userError, resetPasswordSuccess } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess, history, dispatch]);
  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) setErrors(userError);
  }, [userError, history]);
  const handleSubmit = (values) => {
    const { email } = values;
    dispatch(resetPasswordStart({ email }));
  };
  return (
    <AuthWrapper headline="Sign In">
      <div className="formWrapper">
        <Formik
          initialValues={{ email }}
          onSubmit={async (values) => {
            handleSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
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
              <form className="reset-form" onSubmit={handleSubmit}>
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
                  Send Email
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </AuthWrapper>
  );
}
export default PasswordRecovery;
