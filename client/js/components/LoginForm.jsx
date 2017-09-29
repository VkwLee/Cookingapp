import React from 'react';
import {Route ,Link} from 'react-router-dom';
import Home from "./Home.jsx";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name             : '',
      password         : '',
      email            : '',
      confirm_password : ''

    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // authentication() {
  //   if(this.state.username === 'abc' && this.state.password === '123') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // handleSubmit(evt) {
  //   const authSuccess = authentication(this.state.username,this.state.password);
  //   if(authSuccess == true) {
  //     this.setState ({
  //       authState : authSuccess
  //     })
  //   } else {
  //     this.setState ({
  //       authState : authSuccess
  //     })
  //   }
  // }

  handleChange(event) {
    const name = event.target.name;
    const newValue = event.target.value;
    this.setState({
      [name]: newValue
    });

    // v1
    // if (name === 'username') {
    //   this.setState({
    //     username: newValue
    //   });
    // } else if (name === 'password') {
    //   this.setState({
    //     password: newValue
    //   });
    // }

    // v2
    // let stateTransition = {};
    // stateTransition[name] = newValue;

    // ES6 computed property syntax
    // let stateTransition = {
    //   [name]: newValue
    // };

    // this.setState(stateTransition);

    
  }

  // authenticationRender() {
  //   return <div>hey awesome</div>
  // }

 
 


  render() {

    if (this.props.location.pathname === '/') {

      return (
        <div className='c-login'>
          <h1> Foodbook </h1>
          <h4>  A place for real foodies </h4>
          <form method='POST' action='/login'>
            <div>
              <label htmlFor='name'>Name</label>
              <input id='name'type='text' name='name' placeholder='enter your name' value='' onChange = {this.handleChange}/>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
                <input id='email' type='text' name='email' placeholder='enter your email' value='' onChange = {this.handleChange}/>
            </div>
            <div>
              <label htmlFor='password'>Password</label>
                <input id='password' type='text' name='password' placeholder='enter your password' value='' onChange = {this.handleChange}/>
            </div>
            <button className='o-button c-login__button' type='submit' name='submit'>Login</button>
          </form>
          <div className="c-login__new-user">
            <Link to={{pathname: '/new-user'}}>Create new account</Link>{' '}
          </div>
        </div>   
      );


    } else {
      return (
        <div className='c-login'>
          <h1> Foodbook </h1>
          <h4> Let's create an account </h4>
          <form method='POST' action='/new-user'>
            <div>
              <label htmlFor='name'>Name</label>
              <input id='name'type='text' name='name' placeholder='enter your name' value={this.state.name} onChange = {this.handleChange}/>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
                <input id='email' type='text' name='email' placeholder='enter your email' value={this.state.email} onChange = {this.handleChange}/>
            </div>
            <div>
              <label htmlFor='password'>Password</label>
                <input id='password' type='text' name='password' placeholder='enter your password' value={this.state.password} onChange = {this.handleChange}/>
            </div>
            <div>
              <label htmlFor='confirm-password'>Confirm Password</label>
                <input id='confirm-password' type='text' name='confirm_password' placeholder='confirm your password' value={this.state.confirm_password} onChange = {this.handleChange}/>
            </div>
            <button className='o-button c-login__button' type='submit' name='submit'>Submit</button>
          </form>
        </div>   
      );
    }
    
  }
}


