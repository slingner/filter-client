import React from 'react'
import './UserBeanCard.css'
import config from '../../config';
import TokenService from '../../services/token-service';
import BeansListContext from '../../contexts/BeansListContext';
import FilterApiService from '../../services/filter-api-service';
import Review from '../../components/Review/Review';

export default class BeanPage extends React.Component {

  state = {
    reviews: []
  }

  static contextType = BeansListContext;

  componentDidMount() {
    this.fetchBeanReviews();
  }

  fetchBeanReviews = () => {
    FilterApiService.getBeanReviews(this.props.id)
      .then((reviews) => {
        this.setState({ reviews });
      });
  }

  addReview = review => {
    let items = Array.isArray(review) ? review : review;

    items = items.filter((item) => {
      const hasReview = this.state.reviews.some((review) => {
        return review.id === item.id
      })
      return !hasReview
    });

    this.setState({
      reviews: this.state.reviews.concat(items)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = e.target
    FilterApiService.postReview(text.value, this.props.id)
      .then((res)=> {
        this.addReview(res)
      })
      .catch(err => {
        console.error(err);
      })
    e.target.text.value = ''
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

  // fetch delete call to delete specific bean card based on bean id
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
      this.fetchBeanReviews();
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
 
    return (
          <div className='Bean'>
            <h3 className='Bean_name'>
             {this.props.bean_name}
            </h3>
            <p className='Bean_origin'>
             <em>Origin:</em><br /> {this.props.bean_origin}
            </p>
            <p className='Bean_masl'>
            <em>Meters Above Sea Level:</em><br /> {this.props.bean_masl}
            </p>
            <p className='Bean_grower'>
            <em>Grower:</em><br /> {this.props.bean_grower}
            </p>
            <p className='Bean_process'>
            <em>Process:</em><br /> {this.props.bean_process}
            </p>
            <p className='flavor_notes'>
            <em>Flavor Notes:</em><br /> {this.props.flavor_notes}
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
              <button className='review-submit-button' type='submit'>Submit Bean Note</button>
            </form>
            <ul className='reviews'>
            <em>Notes On Bean:</em><br />  {this.state.reviews.map((review) => (<Review key={`review-${review.id}`} deleteReview={this.deleteReview} reviewText={review.text} reviewId={review.id} />))}
            </ul>
            <button className='delete-bean-card-button' onClick={() => this.deleteBean(this.props.id)}>Delete Bean</button>
          </div>
        )}
}

// BeanPage.propTypes = {
//   bean_name: PropTypes.string.isRequired,
// }





