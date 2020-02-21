import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserBeanCard from './UserBeanCard'

describe(`UserBeanCard component`, () => {
  const props = {
    id: '1',
    bean_name: 'testname',
    bean_origin: 'testbeanorigin',
    bean_masl: 'testbeanbeanmasl',
    bean_grower: 'testbeangrower',
    bean_process: 'testbeanprocess',
    flavor_notes: 'testflavornotes',
  }

  it('renders a .UserBeanCard by default', () => {
    const wrapper = shallow(<UserBeanCard />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the UserBeanCard given props', () => {
    const wrapper = shallow(<UserBeanCard {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})