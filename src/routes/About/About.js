import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import './About.css';
import { ReactComponent as FilterLogoHand } from './filterlogohand.svg';
export default class About extends Component {
  render() {
    return (
      <Section className="about">
        <FilterLogoHand className="filterHand" />
        <h2 className="aboutHeader">Savor Each Sip</h2>

        <p>
          Filter believes that the best coffee begins with the bean. We're here
          to match you with your new favorite beans based on your preferences.
          We curate beans from roasters that have a dedicated social
          responsibility with their sustainable sourcing, ethical partnerships,
          and environmental awareness. We combine our coffee expertise with your
          filters to recommend the freshest craft beans from small batch
          roasters directly to you!
        </p>
      </Section>
    );
  }
}
