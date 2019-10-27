import React from 'react';
import { shallow } from 'enzyme';
import BottomNav from '../components/commons/BottomNav';
import { Row, Col, Button } from 'antd';

it('It shows the login card', () => {
  const wrapped = shallow(<BottomNav />);
  expect(wrapped.find(Row).length).toEqual(1);

});
