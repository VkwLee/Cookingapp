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

    render() {
        return (
        	<div className='c-home'>
        		<div className='c-navbar'>
        			<div className='c-navbar__logo'>
	        			<h2> Empty your fridge </h2>
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
		        				<li><Link to='/' className='active'>Homepage</Link></li>
		        				<li><Link to='/profile'>{this.props.userName}</Link></li>
		        			</ul>
		        		</nav>
    				</div>
        		</div>
	        	<SearchResults userId={this.props.userId} recipeList= {this.state.searchResult} />
	        </div>
    	);
    }
}
