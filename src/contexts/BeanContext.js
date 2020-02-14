import React, { Component } from 'react'

export const nullBean = {
  author: {},
  tags: [],
}

const BeanContext = React.createContext({
  Bean: nullBean,
  reviews: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setBean: () => {},
  clearBean: () => {},
  setReviews: () => {},
  addReview: () => {},
})

export default BeanContext

export class BeanProvider extends Component {
  state = {
    Bean: nullBean,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setBean = Bean => {
    this.setState({ Bean })
  }

  setReviews = reviews => {
    this.setState({ reviews })
  }

  clearBean = () => {
    this.setBean(nullBean)
    this.setReviews([])
  }

  addReview = review => {
    this.setReviews([
      ...this.state.reviews,
      review
    ])
  }

  render() {
    const value = {
      Bean: this.state.Bean,
      reviews: this.state.reviews,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBean: this.setBean,
      setReviews: this.setReviews,
      clearBean: this.clearBean,
      addReview: this.addReview,
    }
    return (
      <BeanContext.Provider value={value}>
        {this.props.children}
      </BeanContext.Provider>
    )
  }
}
