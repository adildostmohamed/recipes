import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomeRoute from "./HomeRoute";
import LoginRoute from "./LoginRoute";
import SignupRoute from "./SignupRoute";
import ProfileRoute from "./ProfileRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeRoute} />
        <Route path="/login" exact component={LoginRoute} />
        <Route path="/signup" exact component={SignupRoute} />
        <ProtectedRoute path="/profile" exact component={ProfileRoute} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
