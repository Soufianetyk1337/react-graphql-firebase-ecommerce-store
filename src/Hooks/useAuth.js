import { useHistory } from "react-router-dom";

const { useEffect } = require("react");
const { useSelector } = require("react-redux");

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    return () => {};
  }, [currentUser, history]);
  return currentUser;
};

export default useAuth;
