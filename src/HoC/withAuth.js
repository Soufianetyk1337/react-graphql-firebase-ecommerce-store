import useAuth from "../Hooks/useAuth";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
