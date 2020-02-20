import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import HomePage from '../../routes/HomePage/HomePage'
import BeanListPage from '../../routes/BeanListPage/BeanListPage';
// import BeanPage from '../../routes/BeanCard/BeanCard';
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
    userBeans: [],
    error: null, 
    isAuthenticated: false, 
    reviews: []
  };

  componentDidMount() {
    console.log("TOP LEVEL - ONLY ONCE")
  }

  fetchAllBeans = () => {
    fetch(`${config.API_ENDPOINT}/beans`, {
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
      .then(beans =>
        this.setState({
          beans,
          error: null,
        })
      )
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  fetchBeansByFlavorId = (arrayOfIds, isFromUser) => {
    if(!isFromUser) {
      fetch(`${config.API_ENDPOINT}/beans?flavor_note_id=${arrayOfIds}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => Promise.reject(error))
          }
          return res.json()
        })
        .then(beans => {
          console.log(beans)
          this.setState({
            beans,
            error: null,
        })})
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })   
    } else {
      fetch(`${config.API_ENDPOINT}/userbean?flavor_note_id=${arrayOfIds}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => Promise.reject(error))
          }
          return res.json()
        })
        .then((userBeans) => {
          this.setState({
            userBeans,
            error: null,
        })})
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })   
      }
  }

  fetchBeanByUser = () => {
    fetch(`${config.API_ENDPOINT}/userbean`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then((userBeans) => 
        this.setState({
          userBeans,
          error: null,
      }))
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

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

  addReview = review => {
    console.log('review: ', review);
    this.setState({
      reviews: this.state.reviews.concat(review)
    }, () => console.log('this.state.reviews:', this.state.reviews)) 
  }


  setError = error => {
    console.error(error)
    this.setState({ error })
  }
  clearError = () => {
    this.setState({ error: null })
  }

  // setReviews = reviews => {
  //   this.setState({ reviews })
  // }
  

  render(){
    const contextValue = {
      fetchAllBeans: this.fetchAllBeans,
      beans: this.state.beans,
      reviews: this.state.reviews,
      userBeans: this.state.userBeans,
      fetchBeansByFlavorId: this.fetchBeansByFlavorId,
      fetchBeanByUser: this.fetchBeanByUser,
      fetchSingleBean: this.fetchSingleBean,
      addReview: this.addReview,
      setError: this.setError,
      clearError: this.clearError,
      setReviews: this.setReviews
    }

    return (
        <div className='App'>
          <header className="App__header">
            <Header isAuthenticated={this.state.isAuthenticated} logoutClick={this.handleLogoutClick} />
          </header>
          <BeansListContext.Provider value={contextValue}>
            <main className='App_Main'>
            {this.state.error && <p className='red'>There was an error! Oh no!</p>}
                <Switch>
                    <Route
                    exact
                      path={'/'}
                      component={HomePage}
                    />
                    <Route
                      path={'/BeanList'}
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
                    {/* <PrivateRoute
                      path={'/beans/:beanId'} 
                      component={UserBeanCard}
                    /> */}
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
