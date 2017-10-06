import React from 'react';
import SearchItem from "./SearchItem.jsx";
import {Route ,Link} from 'react-router-dom';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // this.handleChange = this.handleChange.bind(this);
    // this.addNewUser = this.addNewUser.bind(this);
  }



// <h3>{this.props.recipeList[0]}</h3>

  getRecipes() {
    
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
          />
        );
        
      }
    }

    // let toDoItemState;
    // if (this.state.editMode === false) {
    //   toDoItemState = <div onClick={this.editModeToggle}><input
    //         type="checkbox"
    //         checked={this.props.isDone}
    //         onChange={this.handleToggleDone}

    //       />
    //       {this.props.text}</div>;
    // } else {
    //   toDoItemState = <div><input type="text" value={this.state.text} onChange={this.handleTextChange}/><span onClick={this.editModeToggle}>edit/not edit</span></div>;
    // }

    // return (
    //   <div onKeyPress={this.handleKey} className={className}>
    //     <label>
    //       {toDoItemState}
    //     </label>
    //   </div>
    // );

    return (
      <div className="c-search-results">
        <div className="c-search-results__content">
          <h5 className="c-search-results__content--title">
            {this.props.recipeList.length} recipes
          </h5>
          <div>
            {searchItems}
          </div>
        </div>
      </div>
    );
  }
}


