import React from 'react';
import { Row, Col, Button } from 'antd';

class BottomNav extends React.Component {

  render() {
    const {goBack, loading, goNext, goBackButtonText, goNextButtonText} = this.props;

    return (
      <Row style={{ marginTop: 30 }} gutter={24} justify={"center"} type = {"flex"} align={"middle"}>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Button
            onClick={this.props.goBack}
            size="large"
            disabled={this.props.loading}
          >
            {this.props.goBackButtonText}
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            size="large"
            onClick={this.props.goNext}
            htmlType="submit"
            loading={this.props.loading}
          >
            {this.props.goNextButtonText}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default BottomNav;
