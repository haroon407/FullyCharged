import React from 'react';

const DEFAULT_STATE = { token: '' };

export const ThemeContext = React.createContext(DEFAULT_STATE);

export default class Provider extends React.Component {
  state = DEFAULT_STATE;
  tokenChanged = token => {
    this.setState({token});
  };

  render() {
    return (
      <ThemeContext.Provider value={{
        ...this.state,
        tokenChanged: this.tokenChanged,
      }}> {this.props.children} </ThemeContext.Provider>);
  }
}