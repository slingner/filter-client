import React from 'react'
import PropTypes from 'prop-types'
import './UserBeanCard.css'
import config from '../../config';
import TokenService from '../../services/token-service';
import BeansListContext from '../../contexts/BeansListContext';
import FilterApiService from '../../services/filter-api-service';

export default class BeanPage extends React.Component {
  static defaultProps = {
    match: { params: {} },
  }

  state = {
    beans: []
  }

  static contextType = BeansListContext;
//on submit of the review form, this will run the post call to enter data to reviews table in DB
  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = e.target
    FilterApiService.postReview(text.value, this.props.id)
      .then((res)=> {
        text.value = '';
        this.context.addReview(res) 
      })
      .catch(err => {
        console.error(err);
      })
  }
// fetch delete call to delete specific bean card based on bean.id
  deleteBean = (id) =>{
    const newBeans = this.props.userBeans.filter(beans =>
    beans.id !== id
    )
    this.setState({
      beans: newBeans,
    })
    return fetch(`${config.API_ENDPOINT}/userbean/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => { 
          throw error
        })
      }
      this.context.fetchBeanByUser();
    })
    .catch(error => {
      console.error(error)
    })
  }
//fetch delete call to delete specific bean card based on bean id
deleteReview = (id) =>{
  const newReviews = this.context.reviews.filter(reviews =>
  reviews.id !== id
  )
  this.context.addReview(newReviews)
  return fetch(`${config.API_ENDPOINT}/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`
    },
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => { 
        throw error
      })
    }
    this.context.fetchBeanByUser();
  })
  .catch(error => {
    console.error(error)
  })
}
  render() {

  //this grabs the reviews from state in App.js, filters to show only ones that match beanId of review to selected review
  let reviews = this.context.reviews
  let review = reviews.filter(review => review.coffee_bean_id === this.props.id)
  let text = review.map((text, index) => <li key={index}>{text.text}<button className='delete-review-button'key={review.id} onClick={() => this.deleteReview(text.id)}>X</button></li>)
 

    return (
          <div className='Bean'>
            <h3 className='Bean_name'>
             {this.props.bean_name}
            </h3>
            <p className='Bean_origin'>
             Origin: {this.props.bean_origin}
            </p>
            <p className='Bean_masl'>
             Meters Above Sea Level: {this.props.bean_masl}
            </p>
            <p className='Bean_grower'>
             Grower: {this.props.bean_grower}
            </p>
            <p className='Bean_process'>
             Process: {this.props.bean_process}
            </p>
            <p className='flavor_notes'>
             Flavor Notes: {this.props.flavor_notes}
            </p>
            <form  className='reviewSubmit' onSubmit={this.handleSubmit}>
              <textarea 
                aria-label='Comment about this bean...'
                name='text'
                id={this.props.id}
                cols='25'
                rows='3'
                placeholder='Comment about this bean..'
                className="inputAboutBean">
              </textarea>
              <button type='submit'>Submit Bean Comments</button>
            </form>
            <ul className='reviews'>
             Reviews: {text}
            </ul>
      
            <button className='save' onClick={() => this.deleteBean(this.props.id)}>Delete Bean</button>
          </div>
        )}
}

BeanPage.propTypes = {
  bean_name: PropTypes.string.isRequired,
}





