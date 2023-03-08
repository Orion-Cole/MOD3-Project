import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app-context';
import { sessionLogOut } from '../../utilities/user-functions';
import './index.css'

const LogOut = () => {

    const { setUser } = useContext(AppContext);

    const handleLogout = async () => {
      console.log('HANDLELOGOUT ACTIVATED');
      try {
        let response = await sessionLogOut();
        console.log({response});
        setUser(null)
        //window.location.reload()
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div onClick={handleLogout} id='logout-button'>
    LOG OUT
    </div>
  )
}

export default LogOut