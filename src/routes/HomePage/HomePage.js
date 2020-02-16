import React, {Component} from 'react';





export default class LoginForm extends Component {

  render() {
    return(
      <div class='wrapper'>
          {/* <!--
            This checkbox will give us the toggle behavior, hidden but functional
          --> */}
          <input id="hamburger-menu-toggle-1" type="checkbox" />>
        
          {/* <!--
            IMPORTANT: Any element that we want to modify when the checkbox state
            changes go here, being "sibling" of the checkbox element
          --> */}
          <div class='sidebar'>
            {/* <!-- NAVIGATION LINKS GO HERE --> */}
          </div>
          <div class='main-content'>
            <div>
              {/* <!-- This label is assigned to the checkbox, and will contain the toggle --> */}
              <label class="button" data-menu-toggle for="hamburger-menu-toggle-1">
                SHOW MENU
              </label>
            </div>
            {/* <!-- CONTENT GOES HERE --> */}
          </div>
        </div>

    )
  }
}

