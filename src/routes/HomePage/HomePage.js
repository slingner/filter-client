import React, { Component } from 'react';
// import coffee4 from './Assets/coffee4.jpg';
import coffee3 from './Assets/coffee3.jpg';
import coffee2 from './Assets/coffee2.jpg';
import beanlist from './Assets/beanlist.png';
import savedbeans from './Assets/savedbeans.png';
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { ReactComponent as FilterLogo } from './Assets/ICON.svg';
import { ReactComponent as FilterLogoHand } from './Assets/filterlogohand.svg';

export default class HomePage extends Component {
  render() {
    return (
      <>
        <section className="bean-in-hand-img">
          <FilterLogo className="homeLogo" />

          <p className="headertext">
            Discover and explore small batch roasted coffee beans from around
            the world by filtering through a collection of beans by their unique
            flavor profiles.
          </p>
        </section>
        <div className="HomePage-wrapper">
          <div className="content">
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

            {/* <img src={coffee2} className="coffee-froth-img" alt="coffee2" />
          <p>FILTER away!</p>
          <img src={coffee3} className="coffee-filter-img" alt="coffee3" /> */}
          </div>
          <br />
          {TokenService.hasAuthToken() ? (
            ''
          ) : (
            <NavLink to="/register">Sign Up Now!</NavLink>
          )}
          <FilterLogoHand
            style={{
              fill: 'rgb(130, 114, 93)',
              width: '350px',
              margin: 'auto',
            }}
          />
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
        </div>
      </>
    );
  }
}
