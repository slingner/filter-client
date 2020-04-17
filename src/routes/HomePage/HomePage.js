import React, { Component } from 'react';
import coffee4 from './Assets/coffee4.jpg';
import coffee3 from './Assets/coffee3.jpg';
import coffee2 from './Assets/coffee2.jpg';
import beanlist from './Assets/beanlist.png';
import savedbeans from './Assets/savedbeans.png';
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { ReactComponent as FilterLogo } from './Assets/ICON.svg';

export default class HomePage extends Component {
  render() {
    return (
      <div className="HomePage-wrapper">
        <main className="main">
          <section>
            <header>
              <FilterLogo style={{ width: '140px', fill: 'rgb(90, 90, 90)' }} />
            </header>
            <p>
              Discover and explore small batch roasted coffee beans from around
              the world by filtering through a collection of beans by their
              unique flavor profiles.
              {/* To get started,{' '}
              {TokenService.hasAuthToken() ? (
                '(Already Logged In!)'
              ) : (
                <NavLink to="/register">Sign Up Now </NavLink>
              )}{' '}
              and explore the bean collection! */}
            </p>
            <img src={coffee4} className="bean-in-hand-img" alt="coffee4" />
          </section>
          <section>
            <header>
              <h3>Keep track and learn about your favorite beans</h3>
            </header>
            <p>
              {' '}
              Browse through the collection to explore each bean's Country of
              Origin, MASL(Meters Above Sea Level), Grower, Process and Flavor
              Notes.{' '}
            </p>
            <img
              src={beanlist}
              className="screenshot-saved-bean-img"
              alt="savedbeans"
            />
            <p>
              Once you've found some beans that give you a jolt, save them to
              your personalized collection and leave notes for yourself
              regarding each bean!
            </p>
            <img
              src={savedbeans}
              className="screenshot-saved-bean-img"
              alt="savedbeans"
            />
            <p>
              FILTER gives you the chance to explore coffee that is responsibly
              sourced from crops around the world.{' '}
            </p>

            <img src={coffee2} className="coffee-froth-img" alt="coffee2" />
            <p>FILTER away!</p>
            <img src={coffee3} className="coffee-filter-img" alt="coffee3" />
          </section>
          <br />
          {TokenService.hasAuthToken() ? (
            ''
          ) : (
            <NavLink to="/register">Sign Up Now!</NavLink>
          )}

          {/* <p>
            Demo FILTER and see how to save and take notes on each card by{' '}
            <NavLink className="Links" to="/login">
              logging in
            </NavLink>{' '}
            using:{' '}
          </p>
          <p> Username: dunder</p>
          <p> Password: password</p>
          <p></p> */}
        </main>
      </div>
    );
  }
}
