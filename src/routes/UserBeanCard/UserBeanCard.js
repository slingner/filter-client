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
    beans: [],
  }

  static contextType = BeansListContext;


  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = e.target
    FilterApiService.postReview(text.value, this.props.id)
      // .then(this.context.addReview)
      .then(()=> {
        text.value = ''
      })
      .catch(err => {
        console.error(err);
      })
  }

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

  getTextFromReview = () => {
    // let review = this.context.reviews.map(a => a.text)
    // console.log(review)
    let reviews = this.context.reviews.filter(review => review.id === this.props.id  ? review : '')
    

  }


  render() {
   
    console.log(this.getTextFromReview())

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
                cols='45'
                rows='3'
                placeholder='Comment about this bean..'
                className="inputAboutBean">
              </textarea>
              <button type='submit'>Submit Comment</button>
            </form>
            {/* <p className='reviews'>
             Reviews: {reviews}
            </p> */}
            <button className='save' onClick={() => this.deleteBean(this.props.id)}>Delete</button>
          </div>
        )}
  }

BeanPage.propTypes = {
  bean_name: PropTypes.string.isRequired,
}





