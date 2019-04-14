import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} Name ={auth.UserName} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/ParticipantLogin",
                state: {
                  error: true
                }
              }}
            />
          );
        }
      }}
    />
  );
};
