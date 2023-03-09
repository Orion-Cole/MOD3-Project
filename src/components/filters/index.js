import React, { useState } from 'react'
import './index.css'

const Filters = (props) => {

  const setOrder = props.setOrder;
  const setSearch = props.setSearch;
  const setTags = props.setTags;
  const [selectedSort, setSelectedSort] = useState('default'); //radio state
  const [checked, setChecked] = useState(''); //checkbox state
  const [searchString, setSearchString] = useState(''); //search bar state

  const handleSortSubmit = (event) => {
    event.preventDefault();
    setOrder(selectedSort);
    setTags(checked);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearch(searchString);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };




  return (
    <div id='filter-container'>
      <div id='search-bar-container'>
        <h3  id='search-title'>Search</h3>
        <form id='search-form' onSubmit={handleSearchSubmit}>
            <input
              id="search-bar"
              type="text"
              value={searchString}
              onChange={handleSearchChange}
              placeholder='Minecraft'
            />
            <button className='search-button' id='submit' type="submit">Submit</button>
            <button className='search-button' id='clear' type="button" onClick={()=> setSearchString('')}>Clear</button>
        </form>
      </div>
      <div>
        <h3 id='sort-title'>Sort By:</h3>
        <form id='sort-form' onSubmit={handleSortSubmit}>
          <div className='radio-div'>
            <input
              className='radio'
              type="radio"
              id="default"
              name="sort"
              value="default"
              checked={selectedSort === 'default'}
              onChange={() => setSelectedSort('default')}
            />
            <label className='radio-label' htmlFor="default">Default</label>
          </div>
          <div className='radio-div'>
            <input
              className='radio'
              type="radio"
              id="rating"
              name="sort"
              value="rating"
              checked={selectedSort === '-rating'}
              onChange={() => setSelectedSort('-rating')}
            />
            <label className='radio-label' htmlFor="rating">Highest Rating</label>
          </div> 
          <div className='radio-div'>
            <input
              className='radio'
              type="radio"
              id="metacritic"
              name="sort"
              value="metacritic"
              checked={selectedSort === '-metacritic'}
              onChange={() => setSelectedSort('-metacritic')}
            />
            <label className='radio-label' htmlFor="metacritic">Highest Metacritic</label>
          </div>
          <div className='radio-div'>
            <input
              className='radio'
              type="radio"
              id="released"
              name="sort"
              value="released"
              checked={selectedSort === 'released'}
              onChange={() => setSelectedSort('released')}
            />
            <label className='radio-label' htmlFor="released">Release Date</label>
          </div>

          <h3 id='tags-title'>Tags:</h3>

          <div className='checkbox-div'>
            <input
              className='checkbox'
              type="checkbox"
              id="rpg"
              value="rpg"
              checked={checked.includes('rpg')}
              onChange={() => {
                if (checked.includes('rpg')) {
                  setChecked(checked.replace('rpg,', ''));
                } else {
                  setChecked(checked + 'rpg' + ',');
                }
              }}
            />
            <label className='checkbox-label' htmlFor="rpg">RPG</label>
          </div>

          <div className='checkbox-div'>
            <input
              className='checkbox'
              type="checkbox"
              id="co-op"
              value="co-op"
              checked={checked.includes('co-op')}
              onChange={() => {
                if (checked.includes('co-op')) {
                  setChecked(checked.replace('co-op,', ''));
                } else {
                  setChecked(checked + 'co-op' + ',');
                }
              }}
            />
            <label className='checkbox-label' htmlFor="co-op">Co-op</label>
          </div>

          <div className='checkbox-div'>
            <input
              className='checkbox'
              type="checkbox"
              id="multiplayer"
              value="multiplayer"
              checked={checked.includes('multiplayer')}
              onChange={() => {
                if (checked.includes('multiplayer')) {
                  setChecked(checked.replace('multiplayer,', ''));
                } else {
                  setChecked(checked + 'multiplayer' + ',');
                }
              }}
            />
            <label className='checkbox-label' htmlFor="multiplayer">Multiplayer</label>
          </div>

          <div className='checkbox-div'>
            <input
              className='checkbox'
              type="checkbox"
              id="singleplayer"
              value="singleplayer"
              checked={checked.includes('singleplayer')}
              onChange={() => {
                if (checked.includes('singleplayer')) {
                  setChecked(checked.replace('singleplayer,', ''));
                } else {
                  setChecked(checked + 'singleplayer' + ',');
                }
              }}
            />
            <label className='checkbox-label' htmlFor="singleplayer">Singleplayer</label>
          </div>

          <button id='filter-sort-button' type='submit'>Sort</button>
        </form>
      
        
          
        
      </div>
    </div>
  )
}

export default Filters