const { useEffect } = require("react");
const { useSelector } = require("react-redux");

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  useEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
    }
    return () => {};
  }, [currentUser, props.history]);
  return currentUser;
};

export default useAuth;
