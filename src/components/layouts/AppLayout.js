import React from 'react';
import Header from '../commons/Header';

class AppLayout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
