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
    const [boolSwitch, setBoolSwitch] = useState();
    const [isNewOrder, setIsNewOrder] = useState(false)
    // const [page, setPage] = useState(1)//
    // const [boolSwitchPage, setBoolSwitchPage] = useState(false)//
    


 
    

    const scroller = useRef();
    // const isRef = useRef(null);

    let {
      start,
      end,
      isFetching,
      doneFetching,
      setIsFetching,
      forceDonefetching
    } = useLoadMoreOnScroll({ fetchSize: 20, scroller: scroller, limit: 1000 });

    const isMountedRef = useRef(false);

    useEffect(() => { 
      if (!isMountedRef.current) {
        isMountedRef.current = true;
        return;
      }

      console.log('USEEFFECT RUNNING');
      console.log('Ordering state:',order);
      console.log('start and end', start, end);
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
      if (order != '') { //whenever the user submits a new ordering in the filter this runs
        setData([]) //remove games from game list
        setIsFetching(false);
        setIsNewOrder(true);
        setBoolSwitch(boolSwitch => !boolSwitch); //gets top useEffect to run, getting game data with ordering applied
        //setBoolSwitchPage(boolSwitchPage => !boolSwitchPage)//
        //console.log('SCROLLER.CURRENT', scroller.current);
        //scroller.current = [];
        
        // start = 0;
        // end = 0;
      }

     
    }, [order])


    //console.log('start and end after useeffect', start, end);

      const [loaderState, setLoaderState] = useState()
      useEffect(() => { //LOADER
        if (isFetching === true) {
            setLoaderState(<PacmanLoader color="#A7C4C2" id='pacmanLoader'/>)
        } else {
          setLoaderState(null)
        }
      },[isFetching])
    


      //have useEffect dependent on order state changes - inside set end and start state to 0

    const fetchGames = async (start, end) => {
     
      //here - set end and start state to be equal to start and end props passed here
      //replace below end and start with state vars
      // if (boolSwitchPage === true) { //
      //   console.log('PAGE SETTING TO 1');
      //   setPage(1)
      //   setBoolSwitchPage(boolSwitchPage => !boolSwitchPage);
      // } else {
        //   console.log('start and end: ', start, end);
        //   setPage(end / size)
        //   console.log({page});
        //   console.log('ELSE');
        // }
        // console.log('AFTER ELSE');
      
      const size = end - start; //----------------------------
      let page = end / size;
        if (isNewOrder == true) {
          page = 1;
          setIsNewOrder(false);
        }
      const res = await axios({
        method: 'GET',
        url: '/get_games',
        params: {
          page: page,
          size: size,
          order: order,
        }
      });
      console.log('RES.DATA.RESULTS',res.data.results);
      //setData(prevData => [...prevData, ...res.data.results]); ??
      return res.data.results;
      
    };

    
//scroller
//isRef
// ref={node => {
//   scroller.current = node
//   isRef.current = node
// }}
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