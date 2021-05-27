import "./style.scss";
import AuthWrapper from "../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { resetPassword } from "../../redux/User/userActions";
import { useDispatch, useSelector } from "react-redux";
const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

function PasswordRecovery(props) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const { resetPasswordError, resetPasswordSuccess } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resetPasswordSuccess) props.history.push("/login");
  }, [resetPasswordSuccess, props.history]);
  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0)
      setErrors(resetPasswordError);
  }, [resetPasswordError, props.history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
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
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button>Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    </div>
  );
}
export default withRouter(PasswordRecovery);
