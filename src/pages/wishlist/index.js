import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([])

  useEffect(() => {  //gets user data from db
    const getUserData = async () => {
      const response = await axios({
        method: 'GET',
        url: '/getUserData'
      });

      console.log('USER DATA:',response);
      setWishlist(response.data.wishlist)
    }
    getUserData()
  }, [])


  const deleteFav = async (gameTitle) => {
    const response = await axios({
      method: 'DELETE',
      url: '/deleteFromWishlist',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ title: gameTitle })
    })
    console.log({response});
    window.location.reload()
  }




  const displayWishlist = () => {
    return wishlist.map((game) => {
      return (
        <div className='wishlisted-game-container'>
          <h3 className='wishlisted-game'>- {game}</h3>
          <button className='removeGameButton' onClick={()=>deleteFav(game)}>remove</button>
        </div>
      )
    })
  }

  return (
    <div id='wishlist-page'>
        <section id='wishlist-container'>
          <h1>Game Wishlist:</h1>
          {displayWishlist()}
        </section>
    </div>
  )
}

export default Wishlist