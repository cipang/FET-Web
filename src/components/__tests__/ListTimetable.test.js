import React from 'react';
import { mount } from 'enzyme';
import ListTimetables from '../ListTimetables';
import Root from '../../Root';
import { List } from 'antd';
import { timetableTemplate } from '../../helper';

let wrapped;
const Item = List.Item;

const initialstate = {
  showTimetable:false,
  timetables:[
    {...timetableTemplate , new:false, key:"1"},
    {...timetableTemplate , new:false, key:"2"},
    {...timetableTemplate , new:false, key:"3"}
  ]
};

beforeEach(() => {
  wrapped = mount(
    <Root initialState = {{listTimetables: initialstate}}>
      <ListTimetables/>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('It shows all timetables', () => {
  expect(wrapped.find(Item).length).toEqual(3);
});
