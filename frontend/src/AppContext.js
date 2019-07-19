import React, { Component } from "react";
import axios from "axios";

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || ""
    };
  }
  // here
  login = credentials => {
    return axios
      .post("http://localhost:5000/auth/login", credentials)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          user,
          token
        });
        return response;
      });
  };

  componentDidMount() {
    // get dashboard;
  }
  // open dashboard instead
  openDashboard = () => {
    return axios
      .post("http://localhost:5000/bookings/allbookings", this.token)
      .then(response => {
        this.setState({ todos: response.data });
        return response;
      });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          login: this.login // here
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};
