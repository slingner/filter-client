import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';

describe(`Header component`, () => {
  const props = {
  }

  it('renders the header by default', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the header', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})