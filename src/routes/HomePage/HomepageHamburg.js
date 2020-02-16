import React, { Component } from 'react';

class HamburgerMenuWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div class="wrapper">
        {this.state.isOpen && <div class="sidebar">sidebar</div>}
        <button onClick={() => this.toggleMenu()}>Toggle Menu</button>
        <div class="main-content">content</div>
      </div>
    );
  }
}

export default HamburgerMenuWrapper