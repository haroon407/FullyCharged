import React from 'react';
import {ThemeContext} from './providers';

export default class Consumer extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <ThemeContext.Consumer>
        {({token, tokenChanged}) => {
          return React.Children.map(children, child =>
            React.cloneElement(child, {
              token,
              tokenChanged,
            })
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}