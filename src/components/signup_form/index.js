import React, { Component } from 'react'
import { signUp, logIn } from '../../utilities/user-functions.js'
import './index.css'

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };
      handleChange = (event) => {
        let propertyName = event.target.name;
        this.setState({
            [propertyName]: event.target.value,
            error: ''
        });
      };
      handleSubmit = async (event) => {
        event.preventDefault(); // do not refresh the page
        console.log("submitting!");
        // check if password has special character (error handling)
        let data = {...this.state};
        delete data.confirm;
        delete data.error;
 
        let response = await signUp(data);
        console.log(response);

        // make async call to server with the data
        // in a different file - we will bring in that function here

        //after user created auto logIn
        delete data.name;
        delete data.confirm;
        await logIn(data)
      }


  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div id='signup-container'>
          <form id='signup-form' autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button id='signup-form-button' type="submit" disabled={disable}>SIGN UP</button>
          </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    )
  }
};