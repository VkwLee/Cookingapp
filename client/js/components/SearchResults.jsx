import React from 'react';
import SearchItem from "./SearchItem.jsx";
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    let recipes = this.props.recipeList;
    let searchItems= [];
    if (recipes.length > 0) {
      for (let recipeIndex in recipes) {
        const recipe = recipes[recipeIndex];
        searchItems.push(
          <SearchItem
            key={recipeIndex.toString()}
            recipe_id= {recipe['recipe_id']}
            title= {recipe['title']}
            social_rank= {recipe['social_rank']}
            image_url= {recipe['image_url']}
            source_url= {recipe['source_url']}
            userId =  {this.props.userId}
          />
        );
        
      }
    }

    return (
      <div className="c-search-results">
        <h4 className="c-search-results__amount">
          Enjoy here are {this.props.recipeList.length} recipes!
        </h4>
        {searchItems}
      </div>
    );
  }
}


