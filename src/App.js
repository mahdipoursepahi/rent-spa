import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectdRoute from "./components/protectedRoute";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Account from "./components/account";
import Details from "./components/details";
import NotFound from "./components/notFound";
import { getCurrentUser } from "./services/authService";
import "./App.scss";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <Switch>
        <ProtectdRoute path="/account" component={Account} />
        <Route path="/details/:id" component={Details} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/not-Found" component={NotFound} />
        <Route
          path="/"
          exact
          render={(props) => <Home user={user} {...props} />}
        />
        <Redirect to="/not-Found" />
      </Switch>
    </>
  );
}

export default App;
