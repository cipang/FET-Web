import React from 'react';
import Header from '../commons/Header';
import './AppLayout.css';

class AppLayout extends React.Component {
  render() {
    return (
      <div className="applayout-wrapper">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
