import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "../../services/Authentication";

export default function ProtectedRoute({ component: Component, ...rest }) {
  console.log("isUserAuthenticated", isUserAuthenticated());
  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}
