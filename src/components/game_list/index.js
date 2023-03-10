import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';
import useLoadMoreOnScroll from "react-hook-pagination";
import { PacmanLoader } from 'react-spinners';

const GameList = (props) => {

    const navigate = useNavigate();
  
    const [data, setData] = useState([]);
    const order = props.order;
    const tags = props.tags;
    const search = props.search;
    const [boolSwitch, setBoolSwitch] = useState();
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [isNewSearch, setIsNewSearch] = useState(false)
    

    const scroller = useRef();
    // const isRef = useRef(null);

    let {
      start,
      end,
      isFetching,
      doneFetching,
      setIsFetching,
      forceDonefetching
    } = useLoadMoreOnScroll({ fetchSize: 20, scroller: scroller, limit: 10000 });

    const isMountedRef = useRef(false);

    useEffect(() => { 
      if (!isMountedRef.current) {
        isMountedRef.current = true;
        return;
      }

      // console.log('USEEFFECT RUNNING');
      // console.log('Ordering state:',order);
      // console.log('start and end', start, end);
      if (start !== end) {
      setIsFetching(true);
      fetchGames(start, end).then(gameList => {
        setData([...data, ...gameList]);
        setIsFetching(false);
      });
      } else {
        console.log('ELSE');
      }
    }, [start, end, boolSwitch]);


    useEffect(() => { 
      console.log('TAGS', tags);
      if (order !== '' || tags !== '') { //whenever the user submits a new ordering or tags in the filter this runs
        console.log('TRUE!');
        setData([]) //remove games from game list
        setIsFetching(false);
        setIsNewOrder(true);
        setBoolSwitch(boolSwitch => !boolSwitch); //gets top useEffect to run, getting game data with ordering applied
      } else if (search !== '') {
        setData([]) //remove games from game list
        setIsFetching(false);
        setIsNewSearch(true);
        setBoolSwitch(boolSwitch => !boolSwitch); //gets top useEffect to run, getting game data with search applied
      }
    }, [order, search, tags])


      const [loaderState, setLoaderState] = useState()
      useEffect(() => { //LOADER
        if (isFetching === true) {
            setLoaderState(<PacmanLoader color="#A7C4C2" id='pacmanLoader'/>)
        } else {
          setLoaderState(null)
        }
      },[isFetching])
    

    const fetchGames = async (start, end) => {
      console.log('TAAAAGS', tags);
      const size = end - start; 
      let page = end / size;
        if (isNewOrder === true) {
          page = 1;
          setIsNewOrder(false);
        } else if (isNewSearch === true) { 
          page = 1;
          setIsNewSearch(false)
        } 
      const res = await axios({
        method: 'GET',
        url: '/get_games',
        params: {
          page: page,
          size: size,
          order: order,
          search: search,
          tags: tags
        }
      });
      console.log('RES.DATA.RESULTS',res.data.results);
      return res.data.results;
    };

    

  return (
    <div id='game-list' 
      ref={scroller}>
        {data.map((game) => (
          <div key={game.name}
              className='game-list-item-container' 
              onClick={() => { 
                window.scrollTo(0, 0); 
                navigate('/game_info', { 
                  state: { 
                      id: game.id
                  } 
                }); 
              }}
            >
            <img 
              className='game-list-item-container-img' 
              src={game.background_image} 
              alt={game.name + 'cover art'}
              width='100%' 
              height='70%' 
            />
            <h3>{game.name}</h3>
          </div>
      ))}
      { loaderState } 
    </div>
  )
}

export default GameList