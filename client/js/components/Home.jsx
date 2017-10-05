import React from "react";
import {Route ,Link} from 'react-router-dom';
import SearchResults from "./SearchResults.jsx";
import SearchField from "./SearchField.jsx";

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			recipes: []
	    };
	}

    render() {
        return (
        	<div className='c-home'>
        		<div className='c-navbar'>
        			<div className='c-navbar__logo'>
	        			<h1> Foodbook </h1>
	        		</div>
    				<div className='c-navbar__actions'>
    					<SearchField onSearch= {recipe => this.setState({ recipes: recipe })} />
					    <nav className='c-navbar__actions--nav'>
					        <ul>
		        				<li><Link to='/'>Homepage</Link></li>
		        				<li><Link to='/profile'>Profile</Link></li>
		        			</ul>
		        		</nav>
    				</div>
        		</div>
	        	<SearchResults onSearch = {this.state.recipes} />
	        </div>
    	);
    }
}
