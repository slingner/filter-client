import React, {Component} from 'react';
import coffee4 from './Assets/coffee4.jpg';
import coffee3 from './Assets/coffee3.jpg';
import coffee2 from './Assets/coffee2.jpg';
import savedbeans from './Assets/savedbeans.png';
import './HomePage.css';
import { Link } from 'react-router-dom';


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
              <p>Discover and explore small batch roasted coffee beans from around the world by filtering through a collection of beans by their unique flavor profiles. </p>
            </section>
            <section>
              <header>
                  <h3>Keep track and learn about your favorite beans</h3>
              </header>
              <img src={savedbeans} className='screenshot-saved-bean-img' alt='savedbeans'/>
              <p> Browse through the collection to explore each bean's country of origin, MASL(Meters Above Sea Level), Grower, Process and flavor notes. </p>
              <img src={coffee2} className='coffee-froth-img' alt='coffee2'/>
              <p>FILTER gives you the chance to explore coffee flavor profiles and origins responsibly sourced from farms around the world. </p>
              <p>Coffee is the second most traded product around the globe and the second most consumed beverage worldwide with daily global consumption estimated at 2.25 billion cups!  </p>
              <img src={coffee3} className='coffee-filter-img' alt='coffee3'/>
              <p>Once you've found some beans that give you a jolt, save them to your personalized collection.</p>
            </section>
            <section>
              <Link className='Links'
                to='/register'>
                Sign Up Now!
              </Link>
            </section>
          </main>
    </div>
    )
  }
}

