import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BeanCard from './BeanCard'
import BeanListContext from '../../contexts/BeansListContext';


describe(`<BeanCard />`, () => {
  //Snapshot Testing
  it('renders BeanCard by default', () => {
    const wrapper = shallow(
    <BeanListContext.Provider>
      <BeanCard />
    </BeanListContext.Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})