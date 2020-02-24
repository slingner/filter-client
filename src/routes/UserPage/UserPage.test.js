import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserPage from './UserPage'
import BeanListContext from '../../contexts/BeansListContext';


describe(`<BeanListPage />`, () => {
  //Snapshot Testing
  it('renders BeanListPage by default', () => {
    const wrapper = shallow(
    <BeanListContext.Provider>
      <UserPage />
    </BeanListContext.Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})