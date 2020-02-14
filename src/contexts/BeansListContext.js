import React, { Component } from 'react'

const BeanListContext = React.createContext({
  //an empty array of the beanlist
  beanList: [],
  //create the shapes of all the methods to implement
  error: null,
  setError: () => {},
  clearError: () => {},
  setBeanList: () => {},
})
export default BeanListContext

export class BeanListProvider extends Component {
  state = {
    BeanList: [],
    error: null,
  };

  setBeanList = beanList => {
    this.setState({ beanList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      beanList: this.state.beanList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBeanList: this.setBeanList,
    }
    return (
      <BeanListContext.Provider value={value}>
        {this.props.children}
      </BeanListContext.Provider>
    )
  }
}
