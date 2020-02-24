import React from 'react'
import ReactDOM from 'react-dom'
import Review from './Review'
import renderer from 'react-test-renderer';


describe(`<Login />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Review 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<Review />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})