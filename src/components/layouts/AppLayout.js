import React from 'react';
import Header from '../commons/Header';
import { Modal } from 'antd';

import { connect } from 'react-redux';
import './AppLayout.css';
import { updateFieldAsync } from '../../actions';


class AppLayout extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = () => { this.updateFieldAuth("showModal", false); };
  }

  render() {
    const { error, showModal } = this.props.async;
    return (
      <div className="applayout-wrapper">
        <Header/>
        {this.props.children}
        <Modal
          title="Somthing goes wrong"
          visible={showModal}
          onOk={this.closeModal}
          onCancel={this.closeModal}
        >
          <p>{error}</p>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => ({ async: state.async });

export default connect(mapStateToProps, { updateFieldAsync })(AppLayout);
