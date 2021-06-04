import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./auth/AuthContext";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    if (auth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/admin/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
PrivateRoute.PropTypes = {
  component: PropTypes.node.isRequired,
};
export default PrivateRoute;
