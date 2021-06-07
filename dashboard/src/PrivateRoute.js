import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { UserContext } from "./auth/AuthContext";
//import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const auth = useContext(UserContext);
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   useEffect(() => {
  //     console.log(auth, isAuthenticated);
  //     if (auth != null) {
  //       setIsAuthenticated(true);
  //     } else {
  //       console.log("hello", isAuthenticated);
  //       setIsAuthenticated(false);
  //     }
  //   }, []);

  //   if (!isAuthenticated) {
  //     console.log(isAuthenticated);
  //     return <Redirect to="/admin/login" />;
  //   }
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") ? (
          <Redirect to="/admin/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateRoute;
