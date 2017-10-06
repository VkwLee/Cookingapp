import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResult: []
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

    let self = this;
    let data = {
      searchTerm : this.state.searchTerm
    }

    fetch('/recipes',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  
        'Content-Type': 'application/json'
      } 
    })
      .then(response => {
        response.json()
          .then(responseData => {
            if(response.status === 200) {
              let recipesJSON = JSON.parse(responseData).recipes;
              let recipes = [];
              for(let recipeJSON of recipesJSON ) {
                recipes.push({
                  recipe_id: recipeJSON.recipe_id,
                  title: recipeJSON.title,
                  social_rank: recipeJSON.social_rank,
                  image_url: recipeJSON.image_url,
                  source_url:recipeJSON.source_url
                });
              }
              return recipes;

            } else {
              console.error("Server couldn't handle the search: ", response.json());
            }
          }).then(recipes => {
            self.setState({ 
              searchResult: recipes
            });
            return self.state.searchResult
          })
          .then(searchResult => {
              self.props.onSearchResult(searchResult);
          });
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
        <button className='o-button--square'onClick= {this.handleSearch}>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="m347 238c0-36-12-66-37-91-25-25-55-37-91-37-35 0-65 12-90 37-25 25-38 55-38 91 0 35 13 65 38 90 25 25 55 38 90 38 36 0 66-13 91-38 25-25 37-55 37-90z m147 237c0 10-4 19-11 26-7 7-16 11-26 11-10 0-19-4-26-11l-98-98c-34 24-72 36-114 36-27 0-53-5-78-16-25-11-46-25-64-43-18-18-32-39-43-64-10-25-16-51-16-78 0-28 6-54 16-78 11-25 25-47 43-65 18-18 39-32 64-43 25-10 51-15 78-15 28 0 54 5 79 15 24 11 46 25 64 43 18 18 32 40 43 65 10 24 16 50 16 78 0 42-12 80-36 114l98 98c7 7 11 15 11 25z" fill="#ffffff" transform="scale(0.046875 0.046875)">
              </path>
          </svg>
        </button>
      </div>
    );
  }
}