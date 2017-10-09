import React from 'react';
import {Route ,Link} from 'react-router-dom';

export default class SearchItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.saveRecipe = this.saveRecipe.bind(this);
    // this.addNewUser = this.addNewUser.bind(this);
  }


  saveRecipe() {

    evt.preventDefault();

    let fork2food_id = this.props.recipe_id;
    let title        = this.props.title;
    let social_rank  = this.props.social_rank;
    let img          = this.props.image_url;
    let url          = this.props.source_url;
      
    let self = this;
    let data = {
      // user_id     : 
      fork2food_id: fork2food_id,
      title       : title,
      social_rank : social_rank,
      img         : img,
      url         :url
    };

    fetch('/save-recipe', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  
        'Content-Type': 'application/json'
      } 
      
    }).then(function(response) {
      if(response.ok) {
        console.log('Save recipe successfull');
      } else {
        console.log('Failed to save recipe');
      }
    })
    .catch(function(error) {
      console.error('Failed to fetch save recipe ', error);
    });
  }


  render() {
    let imgStyle = {
      backgroundImage:'url(' + `${this.props.image_url} `+ ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all' // 'ms' is the only lowercase vendor prefix
    };

    return (
      <div className='c-search-results__item-wrapper'>
        <h2 className='c-search-results__item__title'>{this.props.title}</h2>
        <div className='c-search-results__item' style={imgStyle}>
          <div className='c-search-results__item__info'>
            <h4>Ingredients:</h4>
            <br/>
            <p>1 ingredient</p>
            <p>5 ingredient</p>
            <p>8 ingredient</p>
            <p>12 ingredient</p>
            <div className='c-search-results__item__actions'>
              <a href={this.props.source_url} target="_blank" className='o-button--white'>link</a>
              <button className='o-button--white' onClick={this.saveRecipe}>
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


