import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import BeanListPage from '../../routes/BeanListPage/BeanListPage';
import BeanPage from '../../routes/BeanCard/BeanCard';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import UserPage from '../../routes/UserPage/UserPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import BeansListContext from '../../contexts/BeansListContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import './App.css';


export default class App extends React.Component {
  state = {
    beans: [],
    error: null, 
    isAuthenticated: false
  };

  
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/beans`, {
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

  fetchBeansByFlavorId = (arrayOfIds) => {
    fetch(`${config.API_ENDPOINT}/beans?flavor_note_id=${arrayOfIds}`, {
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

  //do I also need to add JWT user data to state here?


  handleLoginSuccess = () => {
    if(TokenService.hasAuthToken()) {
      this.setState({
        isAuthenticated: true
      })
    }
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.setState({
      isAuthenticated: false
    })
  }



  render(){
    const contextValue = {
      beans: this.state.beans,
      fetchBeansByFlavorId: this.fetchBeansByFlavorId,
    }

    return (
        <div className='App'>
          <header className="App__header">
            <Header isAuthenticated={this.state.isAuthenticated} logoutClick={this.handleLogoutClick} />
          </header>
          <BeansListContext.Provider value={contextValue}>
            <main className='App_Main'>
            {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
                <Switch>
                    <Route
                      exact
                      path={'/'}
                      component={BeanListPage}
                    />
                    <Route
                      path={'/home'}
                      component={BeanListPage}
                    />
                    <PublicOnlyRoute
                      path={'/login'}
                      component={LoginPage}
                      handleLoginSuccess={this.handleLoginSuccess}
                    />
                    <PublicOnlyRoute
                      path={'/register'}
                      component={RegistrationPage}
                    />
                    <PrivateRoute
                      path={'/account'} 
                      component={UserPage}
                    />
                    <PrivateRoute
                      path={'/beans/:beanId'} 
                      component={BeanPage}
                    />
                     <Route
                      component={NotFoundPage}
                    />
                </Switch>
            </main>
          </BeansListContext.Provider>
      </div>
    );
  }
}
