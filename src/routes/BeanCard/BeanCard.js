import React from 'react'
import PropTypes from 'prop-types'
import './BeanCard.css'
import config from '../../config';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom'


export default class BeanPage extends React.Component {

  state = {
    beanUser:null
  }

  postBeanIdOnUserTable = (beanId) => {
    return fetch(`${config.API_ENDPOINT}/beans`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        coffee_bean_id: beanId
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })   
  }


  handleSaveCardClick = (id) => {
    this.postBeanIdOnUserTable(id)
    console.log(id)
  }

  render() {

  
    return (
          <div className='Bean'>
            <Link className='bean-page-link' to={`/beans/${this.props.id}`} >
              <h3 className='Bean_name'>
              {this.props.bean_name}
              </h3>
            </Link>
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
            {TokenService.hasAuthToken()
            ? <button className='save' onClick={() => this.handleSaveCardClick((this.props.id))}>Save</button>
            : ''}
            
            
          </div>
        )}
  }

BeanPage.propTypes = {
  bean_name: PropTypes.string.isRequired,
}





