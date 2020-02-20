import React, { Component } from 'react';
import BeansListContext from '../../contexts/BeansListContext';
import BeanCard from '../BeanCard/BeanCard';
import './BeanListPage.css';
import CheckBox from '../../components/Checkbox/Checkbox';
import config from '../../config';

export default class BeanListPage extends Component {
  state = {
    flavors: [],
    flavorsSelected: new Map(),
    BeanPage: false,
    error: null,
  };

  static contextType = BeansListContext;

//do I need to call for all flavors here? isn't this happening in Checkbox?
  componentDidMount() {
    this.context.fetchAllBeans();
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
      .then(flavors => {
        this.setState({
          flavors,
          error: null,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChange = (e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ flavorsSelected: prevState.flavorsSelected.set(item, isChecked) }));
  }
//this maps through the Map() to retreive the true/checked values
//once retreived, pass results through fetchbean
  handleClick = () => {
    const map = this.state.flavorsSelected
    let array = Array.from(map.entries())
    array = array.filter(val => {
      return val[1] === true
    }).map(val => {
      return val[0]
    })
    this.context.fetchBeansByFlavorId(array)
  }

  render() {
    const { beans } = this.context
    const { flavors } = this.state

    return (
      <section className='BeanList'>
        <div className='checkbox-wrapper'>
            <CheckBox 
              handleChange={this.handleChange}
              checked={this.state.flavorsSelected.get(flavors.flavor_name)}
              handleClick={this.handleClick}
            />    
            <button className='submit-button' onClick={this.handleClick}>Refresh List</button>
        </div>
        
        <div className='beanlist-wrapper' aria-live='polite'>
          <header className='beanlist-header'>LIST OF BEANS</header>
            <div className='beanlist'>
              {beans.map((bean, idx) => {
                  return (
                  <BeanCard
                    key={idx}
                    {...bean}
                    userBeans={this.context.userBeans}
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

