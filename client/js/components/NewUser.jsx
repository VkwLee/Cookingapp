import React from 'react';
import {Route ,Link} from 'react-router-dom';
import Home from "./Home.jsx";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name                  : '',
      password              : '',
      email                 : '',
      confirm_password      : '',
      email_style_class     : '',
      password_style_class  : '',
      email_reponse         : '',
      password_response     : '',
      error                 : ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
  }

  handleChange(evt) {
    const name = evt.target.name;
    const newValue = evt.target.value.trim();
    this.setState({
      password_style_class  : '',
      email_style_class     : '',
      email_reponse         : '',
      password_response     : '',
      [name]: newValue
    });    
  }


  addNewUser(evt) {
    evt.preventDefault();

    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;

    if(password === confirm_password) {
      let self = this;
      let data = {
        name : name,
        email: email,
        password: password
      };

      fetch('/new-user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {  
          'Content-Type': 'application/json'
        } 
        
      }).then(function(response) {
        if(response.ok) {
          console.log('User has been created');
          self.props.toggleLogInState();
          self.props.history.push({ pathname: '/' })
          return response.json();
        } else {
          console.log('User has not been created');
        }
      }).then(user => {
          self.props.storeUser(user.users_id,user.name);
      })
      .catch(function(error) {
        console.error('Failed to add user: ', error);
      });
    } else {
      console.log('Password is not the same!');
      this.setState({
        password_style_class : 'error',
        password_reponse     : 'password not the same'
      });
    } 

    
  }

  render() {
    return (
      <div className='c-login'>
        <h1> Foodbook </h1>
        <h4> Let's create an account </h4>
        <form >
          <div>
            <label htmlFor='name'>Name</label>
            <input id='name'type='text' name='name' placeholder='enter your name' value={this.state.name} onChange = {this.handleChange}/>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <span>{this.state.email_reponse}</span>
            <input className={this.state.email_style_class}
              id='email' type='text' name='email'
              placeholder='enter your email'
              value={this.state.email}
              onChange = {this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <span>{this.state.password_reponse}</span>
            <input 
              className={this.state.password_style_class}
              id='password'
              type='password'
              name='password'
              placeholder='enter your password'
              value={this.state.password}
              onChange = {this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <span>{this.state.password_reponse}</span>
            <input 
              className={this.state.password_style_class}
              id='confirm-password'
              type='password' 
              name='confirm_password'
              placeholder='confirm your password'
              value={this.state.confirm_password}
              
              onChange = {this.handleChange}
            />  
          </div>
          <button className='o-button c-login__button' id='js-addNewUser' onClick = {this.addNewUser}>Submit</button>
        </form>
      </div>   
    );
  }
}


