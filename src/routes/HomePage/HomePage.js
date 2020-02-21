import React, {Component} from 'react';
import coffee4 from './Assets/coffee4.jpg';
import coffee3 from './Assets/coffee3.jpg';
import coffee2 from './Assets/coffee2.jpg';
import savedbeans from './Assets/savedbeans.png';
import './HomePage.css';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class HomePage extends Component {

  render() {
    return(
      <div className='HomePage-wrapper'>
          <main className="main">
            <section>
              <header>
                  <h3>Welcome to Filter! </h3>
              </header>
              <img src={coffee4} className='bean-in-hand-img' alt='coffee4'/>
              <p>Discover and explore small batch roasted coffee beans from around the world by filtering through a collection of beans by their unique flavor profiles. To get started, {TokenService.hasAuthToken()? '(Already Logged In!)':<NavLink to='/register'>
              Sign Up Now </NavLink>} and explore the bean collection!
              </p>
            </section>
            <section>
              <header>
                  <h3>Keep track and learn about your favorite beans</h3>
              </header>
              <img src={savedbeans} className='screenshot-saved-bean-img' alt='savedbeans'/>
              <p> Browse through the collection to explore each bean's Country of Origin, MASL(Meters Above Sea Level), Grower, Process and Flavor Notes. </p>
              <img src={coffee2} className='coffee-froth-img' alt='coffee2'/>
              <p>FILTER gives you the chance to explore coffee that is responsibly sourced from crops around the world. </p>
              <img src={coffee3} className='coffee-filter-img' alt='coffee3'/>
              <p>Once you've found some beans that give you a jolt, save them to your personalized collection.</p>
            </section>
            {TokenService.hasAuthToken()
            ? '(Already Logged In!)'
          :      <NavLink
          to='/register'>
          Sign Up Now!
          </NavLink>}
        
          
          </main>
    </div>
    )
  }
}

