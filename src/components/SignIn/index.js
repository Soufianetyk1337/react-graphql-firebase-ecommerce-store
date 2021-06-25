/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./SignInStyle.scss";
import Button from "./../Forms/Button";
import FormInput from "./../../components/Forms/FormInput";
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

// const validateEmail =(email) =>{
//   const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
//   return valid.test(email);
// }
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
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <FormInput
              type="type"
              name="email"
              value={email}
              placeholder="Enter Your Email Address"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <i class="bx bx-comment-check"></i>
            <i class="bx bx-comment-error"></i>
            <small>Error Message</small>
          </div>
          <div className="form-control">
            <label htmlFor="email">Password </label>
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Enter Your Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <i class="bx bx-comment-check"></i>
            <i class="bx bx-comment-error"></i>
          </div>
          <Button type="submit" className="form-button">
            Login
          </Button>

          <Button className="form-button google" onClick={handeGoogleSignIn}>
            Google SignIn
          </Button>

          <div className="links form-button">
            <Link to="recovery" className="recovery">
              Reset password
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
/*
<div className="container">
  <form action="" className="form" id="form">
    <div className="form-control">
    <label htmlFor="Email">Email</label>
    <input type="email" placeholder="Enter Your Email"/>
    <i class='bx bx-comment-check'></i>
    <i class='bx bx-comment-error'></i>
    <small>Error Meesage Here</small>
    </div>
  </form>
</div>



<!---------------------------------CSS------------------------------!>
body{
  background-color:#9b95b6;
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  margin:0;
}
.container{
  background-color:#fff;
  border-radius:5px;
  box-shadow:0 2px 5px rgba(0,0,0,.3);
  width:400px;
  max-width:100%;
}
.form{
  padding:30px 40px;

}
.form-control{
  position:relative;
  margin-bottom:10px;
  padding-bottom:20px;
}
.form-control label{
  display:inline-block;
  margin-bottom:5px;
}
.form-control input{
  border:2px solid #f0f0f0;
  border-radius:4px;
  display:block;
  font-size:14px;
  padding:10px;
  width:100%;
}
.form-control i{
 position:absolute;
 top:40px;
 right:10px;
visibility:hidden;
}
.form-control small{
postition:absolute;
visibility:hidden;
left:0;
bottom:0;
}
.form button{
  background-color:#8e44ad;
  border:#8e44ad solid 2px;
  border-radius:4px;
  display:block;
  font-size:16px;
  padding:10px;
  width:100%;
}
.form-control.success input{
  border-color:#2ecc72;
}
.form-control.error input{
  border-color:#e74c3c;
}
.form-control.success i.bx-comment-check{
  visibility:visible;
  color:#2ecc72;
}
.form-control.success i.bx-comment-error{
  visibility:visible;
  color:#e74c3c;
}
*/
