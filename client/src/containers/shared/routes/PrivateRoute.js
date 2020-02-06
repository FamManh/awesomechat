import { isAuthenticated } from "./permissionChecker";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated() ? (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export default PrivateRoute;
