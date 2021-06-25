import "./PasswordRecoveryStyle.scss";
import AuthWrapper from "../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };
  return (
    <div>
      <AuthWrapper headline="Password Recovery">
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">Email Address</label>
              <FormInput
                type="email"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              className="form-button"
              style={{ marginRight: "0", width: "100%" }}
            >
              Email Password
            </Button>
          </form>
        </div>
      </AuthWrapper>
    </div>
  );
}
export default PasswordRecovery;
