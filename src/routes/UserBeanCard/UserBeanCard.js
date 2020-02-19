import React from 'react'
import PropTypes from 'prop-types'
import './UserBeanCard.css'
import config from '../../config';
import TokenService from '../../services/token-service';
import BeansListContext from '../../contexts/BeansListContext';

export default class BeanPage extends React.Component {

  state = {
    beans: [],
  }

  static contextType = BeansListContext;

  // postBeanIdOnUserTable = (beanId) => {
  //   return fetch(`${config.API_ENDPOINT}/beans`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${TokenService.getAuthToken()}`
  //     },
  //     body: JSON.stringify({
  //       coffee_bean_id: beanId
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  //     .catch(error => {
  //       console.error(error)
  //       this.setState({ error })
  //     })   
  // }

  // handleSaveCardClick = (id) => {
  //   this.postBeanIdOnUserTable(id)
  //   console.log(id)
  // }

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


  render() {
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
            <button className='save' onClick={() => this.deleteBean(this.props.id)}>Delete</button>
          </div>
        )}
  }

BeanPage.propTypes = {
  bean_name: PropTypes.string.isRequired,
}





