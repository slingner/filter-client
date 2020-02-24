import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationForm from './RegistrationForm'
import renderer from 'react-test-renderer';


describe(`<Login />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <RegistrationForm 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<RegistrationForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})