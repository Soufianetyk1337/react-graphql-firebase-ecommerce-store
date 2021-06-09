/* eslint-disable no-unused-vars */
import "./default.scss";
import { Route, Switch } from "react-router-dom";
import Registration from "./pages/Registration";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import Recovery from "./pages/Recovery";
import { checkUserSession, setCurrentUser } from "./redux/User/userActions";
import { useDispatch } from "react-redux";
import WithAuth from "./HoC/withAuth";
import WithAdmin from "./HoC/withAdmin";
import AdminToolbar from "./components/AdminToolbar";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Order from "./pages/Order";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
    return () => {};
  }, [dispatch]);
  return (
    <div className="App">
      <AdminToolbar />
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
          path="/search"
          exact
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/search/:filterType"
          exact
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/product/:productId"
          exact
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        />
        <Route
          path="/payment"
          exact
          render={() => (
            <WithAuth>
              <MainLayout>
                <Payment />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/order/:orderId"
          exact
          render={() => (
            <WithAuth>
              <MainLayout>
                <Order />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/cart/"
          exact
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
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
        <Route
          path="/admin"
          render={() => (
            <WithAdmin>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdmin>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
