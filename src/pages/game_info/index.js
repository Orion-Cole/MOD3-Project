import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './index.css'
import { PacmanLoader } from 'react-spinners';

const GameInfo = () => {
  const location = useLocation();

  
  const [isFav, setIsFav] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const [gameTitle, setGameTitle] = useState('')
  const [gamePic, setGamePic] = useState('')
  const [gameEsrbRating, setGameEsrbRating] = useState('')
  const [gameGenreList, setGameGenreList] = useState([])
  const [gameDescription, setGameDescription] = useState('')
  const [gameMetacritic, setGameMetacritic] = useState('')


  useEffect(() => { //when page loads check if game is fav or wishlisted
    // query db to see if game is on fav array


    const getGameData = async () => {
      console.log('getGameData() CALLED');
      const id = location.state.id; //GAME ID INPUT HERE TO GET GAME DATA
      console.log('GAME ID',id);
      const res = await axios({
        method: 'GET',
        url: '/get_game',
        params: {
          id: id
        }
      });
      console.log('!!!!!!!!!!RES.DATA',res.data);
      
      setGameTitle(res.data.name);
      setGamePic(()=>res.data.background_image ? res.data.background_image : 'N/A');
      setGameEsrbRating(()=>res.data.esrb_rating ? res.data.esrb_rating.name : 'N/A');
      setGameGenreList(()=>res.data.genres ? res.data.genres : 'N/A');
      setGameMetacritic(()=>res.data.metacritic ? res.data.metacritic : 'N/A');
      setGameDescription(()=>res.data.description_raw ? res.data.description_raw : 'N/A')
    }
    getGameData()








    const getFavs = async () => {
      const favs = await axios({
        method: 'GET',
        url: '/get_favs'
      })
      console.log(favs.data);
      
      const games = favs.data;
      for (let i = 0; i < games.length; i++) {
        const game = games[i].name;
        if (game === gameTitle) {
          setIsFav(true);
          console.log('FAV MATCH FOUND');
          break; // Stop the loop when the condition is met
        } else {
          setIsFav(false);
          console.log('NO FAV MATCH FOUND');
        } 
      }
    }
    

    // query db to see if game is on wishlist array
    const getWishlist = async () => {
      const wishlist = await axios({
        method: 'GET',
        url: '/get_wishlist'
      })
      console.log(wishlist.data);
      
      const games = wishlist.data;
      for (let i = 0; i < games.length; i++) {
        const game = games[i];
        if (game === gameTitle) {
          setIsWishlisted(true);
          console.log('WISHLIST MATCH FOUND');
          break; // Stop the loop when the condition is met
        } else {
          setIsWishlisted(false);
          console.log(`NO WISHLIST MATCH FOUND ${game}(game) does not match ${gameTitle}(gameTitle)`);
        } 
      }
    }
    
    if (gameTitle) {
      getFavs();
      getWishlist();
    }
  },[gameTitle])



  const toggleFav = () => {
    if (isFav === false) {
      setIsFav(true)
      console.log('SETTING AS FAV');
      // add game name to user model fav game array
      const pushFav = async () => {
        if (gameTitle) {
         
        const response = await axios({
          method: 'POST',
          url: '/addFav',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ title: gameTitle })
        })
        console.log({response});
      } else {
        console.log('TITLE IS UNDEFINED');
      }
    }
      pushFav()
    } else {
      console.log('UNSETTING AS FAV');
      setIsFav(false)
      // remove game name to user model fav game array
      const deleteFav = async () => {
        if (gameTitle) {
         
        const response = await axios({
          method: 'DELETE',
          url: '/deleteFav',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ title: gameTitle })
        })
        console.log({response});
      } else {
        console.log('TITLE IS UNDEFINED');
      }
    }
      deleteFav()
    }
  }

  const toggleWishlisted = () => {
    if (isWishlisted === false) {
      setIsWishlisted(true)
      console.log('SETTING AS WISHLISTED');
      // add game name to user model wishlist game array
      const pushToWishlist = async () => {
        if (gameTitle) {
          
        const response = await axios({
          method: 'POST',
          url: '/addToWishlist',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ title: gameTitle })
        })
        console.log({response});
      } else {
        console.log('TITLE IS UNDEFINED');
      }
    }
      pushToWishlist()
    } else {
      console.log('UNSETTING AS WISH');
      setIsWishlisted(false)
      // remove game name to user model wishlist game array
      const deleteWish = async () => {
        if (gameTitle) {
         
        const response = await axios({
          method: 'DELETE',
          url: '/deleteFromWishlist',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({ title: gameTitle })
        })
        console.log({response});
      } else {
        console.log('TITLE IS UNDEFINED');
      }
    }
      deleteWish()
    }
  }






  

  
    
  const getGenres = () => {
    return gameGenreList.map((genre) => {
      return <h3 className='genre-name'>-{genre.name}</h3>
    })
  }


  const favButtonText = isFav ? 'UNFAVORITE' : 'FAVORITE';
  const wishButtonText = isWishlisted ? 'UNWISHLIST' : 'WISHLIST';
  
  return (
    <div id='game-page'>
      <h1 id='game-title'>{gameTitle}</h1>
      <hr />
      <img id='game-pic' src={gamePic} alt={gameTitle + ' cover art.'}/>
      <section id='game-details'>
        <h2>ESRB Rating: {gameEsrbRating}</h2>
        <h2 className='genre-name'><u>Genres</u>:</h2>
        <div id='genre-list'>
          {getGenres()}
        </div>
        <div id='description'>
          {gameDescription}
        </div>
      </section>
      <section id='fav-wish'>
        <h1 id='fav-button' onClick={()=>toggleFav()}>{favButtonText}</h1>
        <h1 id='wish-button' onClick={()=>toggleWishlisted()}>{wishButtonText}</h1>
      </section>
      <section id='game-ratings'>
        <h2>Ratings:</h2>
        <h3>Metacritic: {gameMetacritic}</h3>
      </section>
    </div>
  )
}

export default GameInfo