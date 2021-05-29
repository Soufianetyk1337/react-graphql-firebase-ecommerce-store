import { useAdmin } from "../Hooks";

function WithAdmin(props) {
  return useAdmin(props) && props.children;
}

export default WithAdmin;
