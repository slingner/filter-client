import React from 'react';
import './BeanCard.css';
import config from '../../config';
import TokenService from '../../services/token-service';
import BeansListContext from '../../contexts/BeansListContext';

export default class BeanPage extends React.Component {

  state = {
    beanUser:null, 
  }

  static contextType = BeansListContext;

  componentDidMount() {
    this.context.fetchBeanByUser();
  }
  //this is the post call to add the beanId to the Filter_Users table in DB
  postBeanIdOnUserTable = (beanId) => {
    return fetch(`${config.API_ENDPOINT}/beans`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
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
      .then(() => this.context.fetchBeanByUser())
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })   
  }
//on click function that is called, which then runs the post of beanId to userID
  handleSaveCardClick = (id) => {
    this.postBeanIdOnUserTable(id)
  }
//if a user has already saved to account, this will toggle to save 'saved!'
  showSavedStatus = () => {
    let arrayOfIds = this.context.userBeans.map( x => x.id )
    const saved = arrayOfIds.includes(this.props.id)

    return (
      saved ? <span>{'Added to favorites'}</span> : 
      <button className='save' onClick={() => {
        this.handleSaveCardClick((this.props.id))
      }}>Add to favorites</button>
    )
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
            {TokenService.hasAuthToken() ? this.showSavedStatus() : ''}
          </div>
        )}
  }







