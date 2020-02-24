import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import renderer from 'react-test-renderer';


describe(`<Login />`, () => {
  //Smoke Testing
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <LoginForm 
        
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  })
  //Snapshot Testing
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<LoginForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})