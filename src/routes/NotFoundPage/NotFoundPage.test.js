import React from 'react'
import ReactDOM from 'react-dom'
import NotFoundPage from './NotFoundPage'
import renderer from 'react-test-renderer';


describe(`<NotFoundPage />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <NotFoundPage 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<NotFoundPage />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})