import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // return <Component {...props} CompName={auth.competitionName}  Name ={auth.UserName} />;
        if (auth.isAuthenticated()) {
          if(rest.type === "Admin"){
            return <Component {...props} UserName ={auth.UserName} />;
          }else{
            return <Component {...props} CompName={auth.competitionName}  Name ={auth.UserName} />;
          }
        } else {
          if(rest.type === "Admin"){
              return (
              <Redirect
                to={{
                  pathname: "/LogIn",
                  state: {
                    error: true
                  }
                }}
              />
            );
          }else{
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
        }
      }}
    />
  );
};
