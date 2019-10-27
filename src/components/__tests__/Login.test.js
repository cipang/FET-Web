import React from 'react';
import { mount } from 'enzyme';
import Login from '../Login';
import Root from '../../Root';
import { Card, Form } from 'antd';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Login/>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('It shows the login card', () => {
  expect(wrapped.find(Card).length).toEqual(1);
});

it('It shows the login form', () => {
  expect(wrapped.find(Form).length).toEqual(1);
});
