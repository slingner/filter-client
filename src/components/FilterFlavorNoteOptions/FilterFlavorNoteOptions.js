import React, { Component } from 'react';
import './FilterFlavorNoteOptions.css';

class FilterFlavorNoteOptions extends Component {

  

 

  render() {
    return (
      <div className="FilterFlavorNoteOptions">
        <div className="FilterFlavorNoteOptions__option">
          <label htmlFor="filter_uploaded">
            <input type="checkbox" value="Uploaded" id="filter_uploaded" name="filter"/>
            FRUIT
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_synced">
            <input type="checkbox" value="Synced" id="filter_synced" name="filter"/>
            FLORAL
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            EARTHY
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            SAVORY
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            SPICE
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            GRAIN and CEREAL
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            NUT
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            SWEET and SUGARY
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            CHOCOLATE
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            BERRY
          </label>
        </div>
        <div className="FilterFlavorNoteOptions__option">  
          <label htmlFor="filter_new">
            <input type="checkbox" value="New" id="filter_new" name="filter"/>
            CITRUS
          </label>
        </div>
      </div>
    );
  }
}

export default FilterFlavorNoteOptions;