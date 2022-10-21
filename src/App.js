import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';


function App() {
 const apiKey = '93b6b6f3c7c8d824afc9cb6d0b32454c'
 const config = {
  headers: {
    URL_PARAM: apiKey
  }
 }
  useEffect(() => {
   
    axios.get(`https://api.getsongbpm.com/song/?api_key=${apiKey}&id=983pB`, config)
    .then(function (response) {
      console.log(response.data);
    }

    )
    .catch(function (error) {
      console.log(error)
    })
  }, [])
  return (
    
    <div className="App">
    </div>
  );
}

export default App;
