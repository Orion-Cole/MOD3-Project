import React, { useState } from 'react'
import './index.css'

const Filters = (props) => {

  const setOrder = props.setOrder
  const [selectedSort, setSelectedSort] = useState('default');

  const handleSortSubmit = (event) => {
    console.log('HANDLE SORT SUBMIT ACTIVATED!!!!!!!!!');
    event.preventDefault();
    setOrder(selectedSort);
  };


  return (
    <div id='filter-container'>
        {/* <form onSubmit={handleSubmit}>
          <label htmlFor="url-input">Search:</label>
            <input
              id="url-input"
              type="url"
              value={searchString}
              onChange={handleStringChange}
              required
              placeholder='Minecraft'
            />
            <button type="submit">Submit</button>
        </form> */}
      <div>
        <p>Sort By:</p>
        <form id='sort-form' onSubmit={handleSortSubmit}>
          <div className='flex-div'>
            <input
              className='sort-input'
              type="radio"
              id="default"
              name="sort"
              value="default"
              checked={selectedSort === 'default'}
              onChange={() => setSelectedSort('default')}
            />
            <label htmlFor="default">Default</label>
          </div>
          <div className='flex-div'>
            <input
              className='sort-input'
              type="radio"
              id="rating"
              name="sort"
              value="rating"
              checked={selectedSort === '-rating'}
              onChange={() => setSelectedSort('-rating')}
            />
            <label htmlFor="-rating">Highest Rating</label>
          </div> 
          <div className='flex-div'>
            <input
              className='sort-input'
              type="radio"
              id="metacritic"
              name="sort"
              value="metacritic"
              checked={selectedSort === '-metacritic'}
              onChange={() => setSelectedSort('-metacritic')}
            />
            <label htmlFor="metacritic">Highest Metacritic</label>
          </div>
          <button id='filter-sort-button' type='submit'>Sort</button>
        </form>
        <form>
          {/* Filter Form made of checkboxes */}
        </form>
      </div>
      {/*  */}
    </div>
  )
}

export default Filters