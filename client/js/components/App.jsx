import React from "react";
import LoginForm from "./LoginForm.jsx";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Home from "./Home.jsx";


export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
	      isLoggedIn : false
	    };

	    this.handleLogIn = this.handleLogIn.bind(this);
	}

	handleLogIn(){
		this.setState({
			isLoggedIn : true
		})
	}



//if key is there dont show the login page.
    render() {

    	// const Login = (props) => {
	    //   return (
	    //     <LoginForm onCreateAccount={ (newLogIn) => this.handleLogin()}
	    //     	{...props}
	    //      />
	        	
	    //   );
	    // }

		return (
			<BrowserRouter>
				<div className='c-app'>
					<Switch>
						<Route initial={!this.state.isLoggedIn} component={LoginForm}>	
						</Route>
						<Route path='/new-user' component={LoginForm}/>
						<Route initial={this.state.isLoggedIn} component={Home}/>
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
