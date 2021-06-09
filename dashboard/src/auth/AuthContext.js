/* eslint-disable react/prop-types */
import React, { Component, createContext } from "react";
//import PropTypes from "prop-types";
export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };
  componentDidMount = () => {
    const uuser = localStorage.getItem("token");
    this.setState({ user: uuser });
    window.addEventListener("storage", () => {
      // When local storage changes, dump the list to
      // the console.
      console.log("storage changed");
    });
  };
  render() {
    const usr = this.state.user;
    return (
      <UserContext.Provider value={usr}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export default UserProvider;
