import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BeanListPage from './BeanListPage'
import BeanListContext from '../../contexts/BeansListContext';


describe(`<BeanListPage />`, () => {
  //Snapshot Testing
  it('renders BeanListPage by default', () => {
    const wrapper = shallow(
    <BeanListContext.Provider>
      <BeanListPage />
    </BeanListContext.Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})