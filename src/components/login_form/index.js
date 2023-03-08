import React, { useEffect, useState, useContext } from 'react';
import { getUserFromSession, logIn } from '../../utilities/user-functions.js'
import { AppContext } from '../../contexts/app-context';
import './index.css'

const Login = () => {
    let { setUser } = useContext(AppContext)
    
    const [formState, setFormState] = useState({email: '', password: ''});
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setDisabled(formState.email && formState.password ? false : true);
    }, [formState])

    useEffect(() => {
      let autoLogin = async () => {
        await logIn(formState);
          //get session info
          let user = await getUserFromSession()
          setUser(user)
      }
      autoLogin()
    }, [])

    const handleChange = (event) => {
        let propertyName = event.target.name;
        setFormState({
            ...formState,
            [propertyName]: event.target.value,
        });
      };

    const handleSubmit = async (e) => {
      // LOGIN
        // make a call to the server with this info and authenticate!
        e.preventDefault();
        await logIn(formState);
        //get session info
        let user = await getUserFromSession()
        setUser(user)
    }

  return (
    <div id='login-container'>
        <form id='login-form' autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={formState.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={formState.password} onChange={handleChange} required />
            <button id='login-form-button' type="submit" disabled={disabled}>Log In</button>
        </form>
        <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}

export default Login;