import React, { Component } from 'react';
import BeansListContext from '../../contexts/BeansListContext';
// import FilterApiService from '..//../services/filter-api-service'
import BeanCard from '../BeanCard/BeanCard';
// import FilterFlavorNoteOptions from '../../components/FilterFlavorNoteOptions/FilterFlavorNoteOptions';
import './UserPage.css';
import CheckBox from '../../components/Checkbox/Checkbox';
import config from '../../config';


export default class BeanListPage extends Component {
  state = {
    // beans: [],
    flavors: [],
    flavorsSelected: new Map(),
    BeanPage: false,
    error: null,
  };

  static contextType = BeansListContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/allflavors`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
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
    console.log(array)
    this.context.fetchBeansByFlavorId(array)
  }
  

  render() {
    const { beans } = this.context
    const { flavors } = this.state

    return (
      <section className='BeanList'>
        <ul>
          
            <CheckBox 
              handleChange={this.handleChange}
              checked={this.state.flavorsSelected.get(flavors.flavor_name)}
              handleClick={this.handleClick}
            />    
        </ul>
        <button className='button' onClick={this.handleClick}>Submit</button>
        <div className='BookmarkList__list' aria-live='polite'>
          <h2>Your Saved Beans</h2>
              {beans.map((bean, idx) => {
                  return (
                  <BeanCard
                    key={idx}
                    {...bean}
                  />
                  )
                })
              }
        </div>
      </section>
    )
  }
}

