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
    this.logIn = this.logIn.bind(this);
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

  handleChange(evt) {
    const name = evt.target.name;
    const newValue = evt.target.value;
    this.setState({
      password_style_class  : '',
      email_style_class     : '',
      email_reponse         : '',
      password_response     : '',
      [name]: newValue
    });    
  }


  logIn(evt) {
    evt.preventDefault();

    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
 

    let self = this;
    let data = {
      name : name,
      email: email,
      password: password
    };

    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  
        'Content-Type': 'application/json'
      } 
      
    }).then(function(response) {
      if(response.ok) {
        console.log('Login successfull');
        self.props.toggleLogInState();
        self.props.history.push({ pathname: '/' })
        return response.json();
      } else {
        console.log('Failed to login');
      }
    }).then(user => {
        self.props.storeUser(user.users_id,user.name);
    })
    .catch(function(error) {
      console.error('Failed to login: ', error);
      self.setState({
        password_style_class : 'error',
        password_reponse     : 'password not the same'
      });
    });
  }

  render() {
    return (
      <div className='c-login'>
        <h1>Empty your fridge</h1>
        <h4>The place for cheapass students who can't cook.</h4>
        <form>
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
              <input id='password' type='password' name='password' placeholder='enter your password' value={this.state.password} onChange = {this.handleChange}/>
          </div>
          <button className='o-button c-login__button' id='js-logIn' onClick = {this.logIn}>Login</button>
        </form>
        <div className="c-login__new-user">
          <Link to='/new-user'>Create new account</Link>
        </div>
      </div>   
    );
  }    
}


