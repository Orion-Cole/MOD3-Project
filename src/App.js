import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Profile from './pages/profile';
import GameInfo from './pages/game_info';
import Wishlist from './pages/wishlist';
import Nav from './components/nav';
import AuthPage from './pages/auth';
import { useContext, useEffect, useState } from 'react';
import Loader from 'react-js-loader';
import { getUserFromSession } from './utilities/user-functions';
import { AppContext } from './contexts/app-context';

function App() {
  const [callMade, setCallMade] = useState(false);
  let { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getSession = async () => {
      
      let userResponse = await getUserFromSession();
      setUser(userResponse)
      setCallMade(true)
    }
      getSession()

  }, [])

  const returnPage = () => {
    if (callMade) { 
      return (
        <> 
          { user ? 
          <div className='page-wrapper'>
            <Nav />
              <Routes>
              <Route path='/home' element={<Home />}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/game_info' element={<GameInfo />}/>
              <Route path='/wishlist' element={<Wishlist />}/>
              <Route path='/*' element={<Navigate to='/home'/>}/>
            </Routes>
          </div>
            :
            <AuthPage />
          }
        </>
      )
    } else {
      return <div>
        <Loader />
      </div>
    }
  }

  return (
    <div className="App">
      { returnPage() }
    </div>
  );
}

export default App;
