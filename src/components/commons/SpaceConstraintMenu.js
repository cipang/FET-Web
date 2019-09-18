import React from 'react';
import { Menu } from 'antd';
import { spaceConstraintList } from '../../constants/constraints';


// Full Version of Sapce Constraint
class SpaceConstraintMenu extends React.Component {

  render() {
    return (
      <Menu style={{ width: 256 }} mode="vertical">
        {spaceConstraintList.map(constraint =>
          <Menu.SubMenu key={constraint.name} title={constraint.name}>
            {
              constraint.children.map(subConstraint =>
                <Menu.Item key={subConstraint}>{subConstraint}</Menu.Item>
              )
            }
          </Menu.SubMenu>
        )}
      </Menu>
    );
  }
}

export default SpaceConstraintMenu;
