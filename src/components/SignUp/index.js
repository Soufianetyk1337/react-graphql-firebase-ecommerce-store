import "./style.scss";
import Button from "./../../components/Forms/Button";
import FormInput from "./../../components/Forms/FormInput";
import { useEffect, useState } from "react";
import AuthWrapper from "../AuthWrapper";
import { withRouter } from "react-router-dom";
import { resetAllAuthForms, signUpUser } from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});
function SignUp(props) {
  const { signUpError, signUpSuccess } = useSelector(mapState);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ ...initialState }));
    // const {
    //   displayName,
    //   email,
    //   password,
    //   confirmPassword,
    //   // eslint-disable-next-line no-unused-vars
    //   errors,
    // } = initialState;
    // if (password !== confirmPassword) {
    //   const err = ["Password don't match"];
    //   setInitialState({
    //     ...initialState,
    //     errors: err,
    //   });
    //   return;
    // }
    // try {
    //   const { user } =  auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   await handleUserProfile({ user, displayName });
    //   setInitialState({
    //     ...initialState,
    //     displayName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     errors: [],
    //   });
    //   props.history.push("/");
    // } catch (error) {
    //   console.error(`error`, error);
    // }
  };
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialState({
      ...initialState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (signUpSuccess) {
      setInitialState({
        ...initialState,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: [],
      });
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess, initialState, props.history, dispatch]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setInitialState({
        ...initialState,
        errors: signUpError,
      });
    }
  }, [signUpError, initialState]);
  return (
    <AuthWrapper headline="Sign Up">
      {initialState.errors.length > 0 && (
        <ul>
          {initialState.errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={initialState.displayName}
            placeholder="Full Name"
            handleChange={handleChange}
          />
          <FormInput
            type="type"
            name="email"
            value={initialState.email}
            placeholder="Enter Your Email Address"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={initialState.password}
            placeholder="Password"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={initialState.confirmPassword}
            placeholder="Connfirm Password Name"
            handleChange={handleChange}
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default withRouter(SignUp);
