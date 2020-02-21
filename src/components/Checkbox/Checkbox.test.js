import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CheckBox from './Checkbox';

describe(`Checkbox component`, () => {
  const props = {
  }

  it('renders the checkbox by default', () => {
    const wrapper = shallow(<CheckBox />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the checkbox from props', () => {
    const wrapper = shallow(<CheckBox {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})