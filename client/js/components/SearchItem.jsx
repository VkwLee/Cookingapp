import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // this.handleChange = this.handleChange.bind(this);
    // this.addNewUser = this.addNewUser.bind(this);
  }


// <h3>{this.props.recipeList[0]}</h3>
  // recipe_id={recipe['recipe_id']}
  // title= {recipe['title']}
  // social_rank= {recipe['social_rank']}
  // image_url= {recipe['image_url']}
  // source_url= {recipe['source_url']} 

  render() {
    return (
      <div className='c-search-results__item'>
        <h2>{this.props.title}</h2>
        <div className='c-search-results__item__toBuy'>
        </div>
        <img src={this.props.image_url}/>
        <button className='o-button'>
          <a href={this.props.source_url} target="_blank" className='c-search-results__item__url'>
            link for decription
          </a>
        </button>
        <button className='o-button'>save</button>
      </div>
    );
  }
}


