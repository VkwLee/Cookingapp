import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      items: "100"
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.addNewUser = this.addNewUser.bind(this);
  }




  getRecipes() {
    
  }

  render() {
    return (
      <div className="c-search-results">
        <div className="c-search-results__content">
          <h1 className="c-search-results__content--title">Recipes {this.state.items} found</h1>
          <h3>{this.props.onSearch}</h3>
        </div>
      </div>
    );
  }
}


