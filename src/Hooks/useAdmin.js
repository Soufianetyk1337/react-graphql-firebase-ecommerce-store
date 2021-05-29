const { useEffect } = require("react");
const { useSelector } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { checkUserIsAdmin } = require("../utils");
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const useAdmin = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push("/login");
    }
    return () => {};
  }, [currentUser, history]);
  return currentUser;
};

export default useAdmin;
