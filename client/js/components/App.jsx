import React from "react";
import LoginForm from "./LoginForm.jsx";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Home from "./Home.jsx";


export default class App extends React.Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	//       isLoggedIn : false
	//     };
	// }


//if key is there dont show the login page.
    render() {
		return (
			<BrowserRouter>
				<div className='c-app'>
					<Switch>
						<Route path='/' component={LoginForm}>	
						</Route>
						<Route path='/new-user' component={LoginForm}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	 
    }
}


// function requireAuth() {
//     		if (this.state.isLoggedIn) {
//     			return (
        
// 		    		<div className= 'c-home'>
// 		            	<Home/>      
// 		            </div>
// 		        );
//     		} else {
//     			return (
//     				<LoginForm/>
// 				);
//     		}
//     	}


// function requireAuth() {  
// 	if (this.state.isLoggedIn === false) {
// 		console.log('not logged in jet');
// 		render = (
// 			<Redirect to={{
// 				pathname: '/login'
// 			}}/>
// 		)
	  
// 	}
// }
