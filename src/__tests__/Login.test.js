import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';
import Root from '../Root';
import { Button, Card, Form, Checkbox, Input } from 'antd';

it('It shows the login card', () => {
  const wrapped = shallow(
    <Root>
      <Login/>
    </Root>
  );
  expect(wrapped.find(Card).length).toEqual(1);
});
