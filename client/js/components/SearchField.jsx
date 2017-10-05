import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
   
  }

  handleChange(evt){
    const name = evt.target.name;
      const newValue = evt.target.value;
      this.setState({
        [name]: newValue
      });    
  }

   // this.props.onSearch(this.state.recipe);
   //  // mode: 'no-cors'

  handleSearch(){


    const API_KEY = '2e8098a7525207c36d8d2d2311d7a858';
    const API_URL = 'http://food2fork.com/api/search?key=';

    fetch('/recipes',{
      method: 'GET'
    })
    .then(function(promise){
      // console.log(`Got response data with status ${response.status}:`,response);
      return promise.json();
    }).then (function (jsonData){
      console.log(jsonData);
    })
    .catch(function(error) {
      console.log('failed to send request', error);
    });
  }

  render() {
    return (
      <div className='c-navbar__actions--search'>
        <input 
          id='search'type='text'
          name='searchTerm'
          placeholder='type in your ingredients'
          value={this.state.searchTerm}
          onChange = {this.handleChange}
        />
        <button onClick= {this.handleSearch}> svg </button>
      </div>
    );
  }
}