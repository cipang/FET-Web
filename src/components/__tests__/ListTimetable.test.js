import React from 'react';
import { mount } from 'enzyme';
import ListTimetables from '../ListTimetables';
import { MemoryRouter } from 'react-router';
import Root from '../../Root';
import { List } from 'antd';
import { timetableTemplate } from '../../helper';

let wrapped;
const Item = List.Item;

const initialstate = {
  listTimetables: {
    showTimetable:false,
    timetables:[
      {...timetableTemplate , new:false, key:"1"},
      {...timetableTemplate , new:false, key:"2"},
      {...timetableTemplate , new:false, key:"3"}
    ]
  },
  auth: {
    loggedIn:true,
    headerPos:"1",
    user:{
      email:"test@test.com"
    }
  }
};

//mocked history
const history = {
  push: () => { return 0 }
}

beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialstate}>
      <MemoryRouter>
        <ListTimetables  history={history} />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('It shows all timetables', () => {
  expect(wrapped.find(Item).length).toEqual(3);
});
