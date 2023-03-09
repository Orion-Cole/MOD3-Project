import React, { useEffect, useState } from 'react'
import Filters from '../../components/filters';
import GameList from '../../components/game_list';
import './index.css'

const Home = () => {

  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setOrder('')
  }, [search])


  return (
    <div id='home-container'>
        <Filters setTags={setTags} setOrder={setOrder} setSearch={setSearch}/>
        <GameList tags={tags} order={order} search={search}/>
    </div>
  )
}

export default Home