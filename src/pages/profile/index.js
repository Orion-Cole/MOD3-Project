import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

const Profile = () => {

    const [url, setUrl] = useState('');
    const [displayedUrl, setDisplayedUrl] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [favorites, setFavorites] = useState([])
    const [visable, setVisable] = useState(false)

    useEffect(() => {  //gets user data from db
      const getUserData = async () => {
        const response = await axios({
          method: 'GET',
          url: '/getUserData'
        });
  
        console.log('USER DATA:',response);
        setDisplayedUrl(response.data.picUrl)
        setName(response.data.name)
        setEmail(response.data.email)
        setFavorites(response.data.favorites)
      }
      getUserData()
    }, [])
    
  
    const handleSubmit = async (event) => { //change user profile pic
      event.preventDefault();
        const response = await axios({
          method: 'PUT',
          url: '/changePic',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ url: url })
        });
        window.location.reload(); //refresh page
    };
  
    const handleUrlChange = (event) => {
      setUrl(event.target.value);
    };

    const displayForm = () => {
      if (visable == true) {
        return (
          <form id='change-pic' onSubmit={handleSubmit}>
            <label htmlFor="url-input">URL:</label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder='URL for profile picture'
              />
              <button id='url-button-submit' type="submit">Submit</button>
          </form>
        )
      }
    }

    const toggleTextBoxVisibility = () => {
      if (visable == true) {
        setVisable(false)
      } else {
        setVisable(true)
      }
    }


  

    const deleteFav = async (gameTitle) => {
      const response = await axios({
        method: 'DELETE',
        url: '/deleteFav',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ title: gameTitle })
      })
      console.log({response});
      window.location.reload()
    }
    

    const displayFavorites = () => {
      return favorites.map((game) => {
        return (
          <div className='fav-game-container'>
            <h3 className='fav-game'>
              - {game}
            </h3>
            <button className='removeGameButton' onClick={()=>deleteFav(game)}>
              Remove
            </button>
          </div>
        )
      })
    }

  return (
      <div id='profile-page'>
        <section id='image-section'>
          <button id='url-button-change' onClick={toggleTextBoxVisibility}>Change Profile Picture</button>
          <img id='profile-pic' src={displayedUrl} alt='Image not found at URL'/>
          {displayForm()}
        </section>

        <section id='user-data'>
          <div id='name'>
            <h2>{name}</h2>
          </div>
          <div id='email'>
            <h3>{email}</h3>
          </div>
        </section>

        <section id='favorites-list'>
          <h1>Favorite Video Games:</h1>
          {displayFavorites()}
        </section>
      </div>
  )
}

export default Profile