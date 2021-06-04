import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    window.addEventListener("storage", () => {
      const auth = localStorage.getItem("mk__auth");
      this.setState({ user: auth });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserProvider;
