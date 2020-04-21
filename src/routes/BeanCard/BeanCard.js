import React from 'react';
import './BeanCard.css';
import config from '../../config';
import TokenService from '../../services/token-service';
import BeansListContext from '../../contexts/BeansListContext';
import { ReactComponent as FilterLogo } from '../HomePage/Assets/ICON.svg';

export default class BeanPage extends React.Component {
  state = {
    beanUser: null,
    toggle: true,
  };

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
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        coffee_bean_id: beanId,
      }),
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then(() => this.context.fetchBeanByUser())
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };
  //on click function that is called, which then runs the post of beanId to userID
  handleSaveCardClick = (id) => {
    this.postBeanIdOnUserTable(id);
  };
  //if a user has already saved to account, this will toggle to save 'saved!'
  showSavedStatus = () => {
    let arrayOfIds = this.context.userBeans.map((x) => x.id);
    const saved = arrayOfIds.includes(this.props.id);

    return saved ? (
      <p className="added">{'Added to favorites'}</p>
    ) : (
      <button
        className="save"
        onClick={() => {
          this.handleSaveCardClick(this.props.id);
        }}
      >
        Add to favorites
      </button>
    );
  };

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render() {
    return (
      <div className="Bean" onClick={this.handleToggle}>
        <FilterLogo className="cardlogo" />
        <h3 className="Bean_name" style={{ margin: '5px' }}>
          {this.props.bean_name}
        </h3>
        {!this.state.toggle && (
          <div>
            <p className="Bean_origin">
              <em>Origin:</em>
              <br /> {this.props.bean_origin}
            </p>
            <p className="Bean_masl">
              <em>Meters Above Sea Level:</em> <br />
              {this.props.bean_masl}
            </p>
            <p className="Bean_grower">
              <em>Grower:</em>
              <br /> {this.props.bean_grower}
            </p>
            <p className="Bean_process">
              <em>Process:</em> <br />
              {this.props.bean_process}
            </p>
            <p className="flavor_notes">
              <em>Flavor Notes:</em>
              <br />
              {this.props.flavor_notes}
            </p>
            {TokenService.hasAuthToken() ? this.showSavedStatus() : ''}
          </div>
        )}
      </div>
    );
  }
}
