import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      doSearch: false
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

  handleSearch(){
    this.props.onSearch(this.state.searchTerm);
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