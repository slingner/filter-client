import React, { Component } from 'react';
import FilterApiService from '..//../services/filter-api-service'

import React, { Component } from 'react';
import BeansListContext from '../../contexts/BeansListContext';
// import FilterApiService from '..//../services/filter-api-service'
import BeanPage from '../BeanCard/BeanCard';
// import FilterFlavorNoteOptions from '../../components/FilterFlavorNoteOptions/FilterFlavorNoteOptions';
import './BeanListPage.css';
import config from '../../config';
import CheckBox from '../../components/Checkbox/Checkbox'



export default class BeanListPage extends Component {
  state = {
    beans: [],
    value: '',
    error: null,
  };

  static contextType = BeansListContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/beans/${id}`, {
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
      .then(beans => 
        this.setState({
          beans,
          error: null,
      }))
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }



  render() {

    return (
     
    )
  }
}


