import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface IProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

// basic auth check which looks for the presence of a token in local storage
// can be made more advanced
const checkForAuthToken = (): boolean => {
  const token = localStorage.getItem("token");
  if (token) return true;
  return false;
};

const ProtectedRoute = ({
  component: Component,
  ...rest
}: IProtectedRouteProps) => {
  // check if user is currently logged in
  // if yes render the component
  // if not redirect to login component
  // and set state to indicate current url to access in login to redirect to
  // available on this.props.location.state.referrer.pathname
  return (
    <Route
      {...rest}
      render={(props) =>
        checkForAuthToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
