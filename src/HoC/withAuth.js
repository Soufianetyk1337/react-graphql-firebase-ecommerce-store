import { withRouter } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// eslint-disable-next-line react-hooks/rules-of-hooks
const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
