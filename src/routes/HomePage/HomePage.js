import React, { Component } from 'react';
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { ReactComponent as FilterLogo } from './Assets/ICON.svg';
import { ReactComponent as CoffeeBirdy } from './Assets/coffeebirdy.svg';

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

            <p>
              Once you've found some beans that give you a jolt, save them to
              your personalized collection and leave notes for yourself
              regarding each bean.
            </p>

            <p>
              FILTER gives you the chance to explore coffee that is responsibly
              sourced from crops around the world.{' '}
            </p>
          </div>
          <br />
          {TokenService.hasAuthToken() ? (
            ''
          ) : (
            <NavLink to="/register" className="signUp">
              Get Started
            </NavLink>
          )}
          <CoffeeBirdy
            style={{
              fill: 'rgb(130, 114, 93)',
              width: '150px',
              margin: 'auto',
              marginTop: '40px',
            }}
          />
        </div>
      </>
    );
  }
}
