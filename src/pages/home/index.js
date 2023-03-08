import React, { useContext, useEffect, useRef, useState } from 'react'
import Filters from '../../components/filters';
import GameList from '../../components/game_list';
import { AppContext } from '../../contexts/app-context';
import './index.css'

const Home = () => {

  const [order, setOrder] = useState('')


  return (
    <div id='home-container'>
        <Filters setOrder={setOrder}/>
        <GameList order={order}/>
    </div>
  )
}

export default Home