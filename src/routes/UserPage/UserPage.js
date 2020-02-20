import React, { Component } from 'react';
import BeansListContext from '../../contexts/BeansListContext';
// import FilterApiService from '..//../services/filter-api-service'
import UserBeanCard from '../UserBeanCard/UserBeanCard';
import './UserPage.css';
import CheckBox from '../../components/Checkbox/Checkbox';
import config from '../../config';
// import TokenService from '../../services/token-service';
import FilterApiService from '../../services/filter-api-service';

export default class BeanListPage extends Component {
  state = {
    flavors: [],
    flavorsSelected: new Map(),
    BeanPage: false,
    error: null,
  };

  static contextType = BeansListContext;
  componentDidMount() {
    this.context.fetchBeanByUser();
    fetch(`${config.API_ENDPOINT}/allflavors`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(flavors => 
        this.setState({
          flavors,
          error: null,
      }))
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
    FilterApiService.getBeanReviews()
      .then(this.context.addReview)
      .catch(this.context.setError)
  }

 

  

  handleChange = (e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ flavorsSelected: prevState.flavorsSelected.set(item, isChecked) }));
  }

  handleClick = () => {
    //do a loop through flavors selected
    //create a new array of checked ids
    const map = this.state.flavorsSelected
    let array = Array.from(map.entries())
    array = array.filter(val => {
      return val[1] === true
    }).map(val => {
      return val[0]
    })

    this.context.fetchBeansByFlavorId(array, true)
  }

  render() {
    const { userBeans } = this.context
    const { flavors } = this.state
   
    return (
      <section className='BeanList'>
        <div>
            <CheckBox 
              handleChange={this.handleChange}
              checked={this.state.flavorsSelected.get(flavors.flavor_name)}
              handleClick={this.handleClick}
            />    
            <button className='submit-button' onClick={this.handleClick}>Refresh List</button>
        </div>
        
        <div className='BookmarkList__list' aria-live='polite'>
          <header className='beanlist-header'>YOUR SAVED BEANS</header>
          <div className='beanlist'>
              {userBeans.map((bean, idx) => {
                  return (
                  <UserBeanCard
                    key={idx}
                    {...bean}
                    userBeans={this.context.userBeans}
                    beans={this.context.beans}
                  />
                  )
                })
              }
          </div>
        </div>
      </section>
    )
  }
}

