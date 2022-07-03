import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router , Routes , Route, useNavigate } from 'react-router-dom'
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Login from './components/Login';
import { useDataLayerValue } from './appState/StateProvider';

function App() {

  const [{user} , dispatch] = useDataLayerValue()

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if(user) {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      }
    })
  } , [])
  

  return (
    <div className="App">
      <Router>
        {!user ? <Login /> : (
          <>
            <Header />
            <div className='app_body'>
                <Sidebar />
                <Routes>
                  <Route path='/room/:roomId' element={<Chat />} />
                  <Route path='/' element={''}  />
                </Routes>
            </div> 
          </>
        )}
      </Router> 
    </div>
  );
}

export default App;
