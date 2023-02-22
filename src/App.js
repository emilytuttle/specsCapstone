import {Routes, Route, Navigate} from 'react-router-dom'
import { useContext } from 'react';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import DetailScreen from './pages/DetailScreen';




import AuthContext from './store/authContext';

function App() {
  const authCtx = useContext(AuthContext)
  
return (
  <div>
    <div><Header/></div>
    <div className='full'>
      <Routes>
        <Route path='/' element={!authCtx.token ? <Login/> : <Navigate to='/home'/>}/>
        <Route path='/home' element={authCtx.token ?<Home/> : <Navigate to='/login'/>}/>
        <Route path='/vehicle/:id' element={authCtx.token ?<DetailScreen/> : <Navigate to='/login'/>}/> 
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  </div>
)
  
}

export default App;
