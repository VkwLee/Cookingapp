import React from "react";
import {Route ,Link} from 'react-router-dom';
import SearchResults from "./SearchResults.jsx";
import SearchField from "./SearchField.jsx";

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchResult: []
	    };
	}

	componentWillMount(){

		let data = {
			userId: this.props.userId
		}

		fetch('/profile-recipes', {
	        method: 'POST',
	        body: JSON.stringify(data),
	        headers: {  
	          'Content-Type': 'application/json'
	        } 
	        
		}).then(function(response) {
			if(response.ok) {
			  console.log('get recipes successfully');
			  return response.json();
			} else {
			  console.log('Failed to get recipes');
			}
		}).then(recipes => {
		  	console.log(recipes);

		  	this.setState({
		  		searchResult:recipes
		  	})
		})
		.catch(function(error) {
			console.error('Failed to get recipes: ', error);
		});
	}

    render() {
        return (
        	<div className='c-home'>
        		<div className='c-navbar'>
        			<div className='c-navbar__logo'>
	        			<h2> Empty {this.props.userName}'s fridge </h2>
	        		</div>
    				<div className='c-navbar__actions'>
    					<SearchField 
	    					onSearchResult= {
	    						searchResult => this.setState (
	    							{ searchResult: searchResult }
    							)
	    					}
    					/>
					    <nav className='c-navbar__actions--nav'>
					        <ul>
		        				<li><Link to='/'>Homepage</Link></li>
		        				<li><Link to='/profile' className='active'>{this.props.userName}</Link></li>
		        			</ul>
		        		</nav>
    				</div>
        		</div>
	        	<SearchResults userId={this.props.userId} recipeList= {this.state.searchResult} />
	        </div>
    	);
    }
}
