import React from 'react';
import Header from '../commons/Header';
import { Modal, Spin, Row } from 'antd';

import { connect } from 'react-redux';
import './AppLayout.css';
import { updateFieldAsync } from '../../actions';


class AppLayout extends React.Component {

  closeModal = () => {
    this.props.updateFieldAsync("showModal", false);
    this.props.push("/listTimetables");
    // better way to toggle data refresh needed
    window.location.reload();
  };

  closeModalWithoutRefresh = () => {
    this.props.updateFieldAsync("showModal", false);
  };

  componentDidMount(){
    //TODO: null?
    if((!localStorage.getItem('ws-token')
        || localStorage.getItem('ws-token') == "null")
        && this.props.history) {
      Modal.error({
         title: 'You need to log in first!',
         onOk: () => {
           this.props.history.push("/signIn");
         },
       });
    }
  }

  render() {
    // {loading && !this.props.customLoading?
    //   <Row className="center-spinner">
    //     <Spin size="large" />
    //   </Row>
    //   :this.props.children}
    const { showModal, modalMsg, loading } = this.props.async;
    return (
      <div className="main applayout-wrapper">
        <Header/>
        {this.props.children}
        <Modal
          title="Somthing happened"
          visible={showModal}
          onOk={this.closeModal}
          onCancel={this.closeModalWithoutRefresh}
        >
          <p>{modalMsg}</p>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => ({ async: state.async });

export default connect(mapStateToProps, { updateFieldAsync })(AppLayout);
