/* eslint-disable no-unused-vars */
import "./default.scss";
import { Route, Switch } from "react-router-dom";
import Registration from "./pages/Registration";
import { auth, handleUserProfile } from "./firebase/utils";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import Recovery from "./pages/Recovery";
import { checkUserSession, setCurrentUser } from "./redux/User/userActions";
import { useDispatch } from "react-redux";
import WithAuth from "./HoC/withAuth";
function App(props) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const authListener = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await handleUserProfile({ userAuth });

  //       userRef.onSnapshot(async (snapshot) => {
  //         await dispatch(
  //           setCurrentUser({
  //             id: snapshot.id,
  //             ...snapshot.data(),
  //           })
  //         );
  //       });
  //     }
  //     dispatch(setCurrentUser(userAuth));
  //   });
  //   return () => {
  //     authListener();
  //   };
  // }, [dispatch]);
  //
  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
