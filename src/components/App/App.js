import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import HomePage from '../../routes/HomePage/HomePage';
import BeanListPage from '../../routes/BeanListPage/BeanListPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import UserPage from '../../routes/UserPage/UserPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import About from '../../routes/About/About';
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
    reviews: [],
  };

  //fetches the full list of beans from the coffee_beans table in DB
  fetchAllBeans = () => {
    fetch(`${config.API_ENDPOINT}/beans`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((beans) =>
        this.setState({
          beans,
          error: null,
        })
      )
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  //fetches a filtered list of beans from the coffee_beans table based on flavor notes selected
  //based on if it's coming from a logged in user or not
  fetchBeansByFlavorId = (arrayOfIds, isFromUser) => {
    if (!isFromUser) {
      fetch(`${config.API_ENDPOINT}/beans?flavor_note_id=${arrayOfIds}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => Promise.reject(error));
          }
          return res.json();
        })
        .then((beans) => {
          this.setState({
            beans,
            error: null,
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    } else {
      fetch(`${config.API_ENDPOINT}/userbean?flavor_note_id=${arrayOfIds}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => Promise.reject(error));
          }
          return res.json();
        })
        .then((userBeans) => {
          this.setState({
            userBeans,
            error: null,
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };
  //this fetches all beans that a logged in user has saved from the saved table in DB
  fetchBeanByUser = () => {
    fetch(`${config.API_ENDPOINT}/userbean`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((userBeans) =>
        this.setState({
          userBeans,
          error: null,
        })
      )
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };
  //changes state once a user successfully logs in
  handleLoginSuccess = () => {
    if (TokenService.hasAuthToken()) {
      this.setState({
        isAuthenticated: true,
      });
    }
  };
  //changes state to logged out when a user clicks log out
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.setState({
      isAuthenticated: false,
    });
  };
  //add a review to the reviews state when a user hits submit on the add review button
  //inside UserBeanCard.js. This is also ensure that you only are adding reviews that aren't already there
  addReview = (review) => {
    let items = Array.isArray(review) ? review : review;

    items = items.filter((item) => {
      const hasReview = this.state.reviews.some((review) => {
        return review.id === item.id;
      });
      return !hasReview;
    });

    this.setState({
      reviews: this.state.reviews.concat(items),
    });
  };
  //this changes state of error to true
  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };
  //this sets the state of error to null
  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    //this is where all my context lives under the name BeanListContext
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
    };

    return (
      <div className="App">
        <header>
          <Header
            isAuthenticated={this.state.isAuthenticated}
            logoutClick={this.handleLogoutClick}
          />
        </header>
        <BeansListContext.Provider value={contextValue}>
          <main className="App_Main">
            {this.state.error && (
              <p className="red">There was an error! Oh no!</p>
            )}
            <Switch>
              <Route exact path={'/'} component={HomePage} />
              <PrivateRoute path={'/BeanList'} component={BeanListPage} />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
                handleLoginSuccess={this.handleLoginSuccess}
              />
              <Route path={'/about'} component={About} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PrivateRoute path={'/account'} component={UserPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </BeansListContext.Provider>
      </div>
    );
  }
}
