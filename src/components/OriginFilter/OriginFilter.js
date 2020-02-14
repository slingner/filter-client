import React from 'react';
import config from '../../config';
import './OriginFilter.css';
// import BeanListPage from '../../routes/BeanListPage/BeanListPage';

export default class CheckBox extends React.Component {
  state = {
    flavors: [],
    error: null
  };

  
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

  
  render() {
    // const { countries } = this.state;
   
    // const flavorName = countries.map((flavor) => 
    //   <div className='checkbox' key={ flavor.id }>
    //     <label  htmlFor={ flavor.flavor_name }>
    //       <input onChange={ e => this.props.handleChange(e)} type="checkbox" value={ flavor.flavor_name } id={ flavor.id } className="checkBox" checked={ this.props.checked } />
    //       { flavor.flavor_name }
    //     </label>
    //   </div>
    // )

    return (
      <div className='checkbox_container'>
        <h3 className='OriginFilterDropdown'>Origin Filter</h3>
        <select onChange={ e => this.props.handleOriginSelect(e)} value={this.state.value} className="Origins">
          {this.props.originState.map(item => (
              <option key={item.value} value={item.value}>
                {item.bean_origin}
              </option>
            ))}
      </select>  
      </div>
    )
  }
}
