import React from 'react';
import { Select } from 'antd';

class SpaceConstraint extends React.Component {

  render() {
    return (
      <div>
        <Select defaultValue="lucy" style={{ width: 200 }}>
          <Select.OptGroup label="Manager">
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
          </Select.OptGroup>
          <Select.OptGroup label="Engineer">
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select.OptGroup>
        </Select>
      </div>
    );
  }
}

export default SpaceConstraint;
