import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationPage from './RegistrationPage'
import renderer from 'react-test-renderer';


describe(`<RegistrationPage />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <RegistrationPage 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<RegistrationPage />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})