import React from "react";
import LoginForm from "./LoginForm.jsx";
import NewUser from "./NewUser.jsx";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Home from "./Home.jsx";


export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
	      isLoggedIn : false
	    };

	    this.handleToggleLogInState = this.handleToggleLogInState.bind(this);
	}

	handleToggleLogInState(){
		this.setState({
			isLoggedIn : !this.state.isLoggedIn
		})
	}



//if key is there dont show the login page.
    render() {

    	const MyLogInForm = (props) => {
	      return (
	        <LoginForm {...props} toggleLogInState= {() => this.handleToggleLogInState()}>
		     
	        </LoginForm> 	
	      );
	    }

	    const MyNewUser = (props) => {
	      return (
	        <NewUser {...props} toggleLogInState= {() => this.handleToggleLogInState()}
	        	
	         />
	        	
	      );
	    }

	    if(this.state.isLoggedIn) {
	    	return (
				<BrowserRouter>
					<div className='c-app'>
						<Switch>
							<Route path='/' component={Home}/>
						</Switch>
					</div>
				</BrowserRouter>
			);	
	    } else {
	    	return (
				<BrowserRouter>
					<div className='c-app'>
						<Switch>
							<Route exact path='/' render={MyLogInForm}/>
							<Route exact path='/new-user' render={MyNewUser}/>
						</Switch>
					</div>
				</BrowserRouter>
			);	
	    }

		
	 
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
