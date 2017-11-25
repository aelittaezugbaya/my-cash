import React from 'react';

export default class Header extends React.Component{
  render() {
    return (
      <div className="text-center header">
        <h1>{this.props.children}</h1>
      </div>
    )
  }
};
