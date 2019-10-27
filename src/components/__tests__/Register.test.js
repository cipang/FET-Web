import React from 'react';
import { mount } from 'enzyme';
import Register from '../Register';
import Root from '../../Root';
import { Card, Form } from 'antd';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Register/>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('It shows the Register card', () => {
  expect(wrapped.find(Card).length).toEqual(1);
});

it('It shows the Register form', () => {
  expect(wrapped.find(Form).length).toEqual(1);
});
