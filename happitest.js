const apiKey = '013c5djTMnDt6834DWWDXt0ss1IukjDVSYKUjFTpmMVvF6vShBV9hulA'


useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.happi.dev/v1/music/bpm/playlist/:tempo',
      params: {temp: 160, limit: 10},
     
        'x-happi-key': '013c5djTMnDt6834DWWDXt0ss1IukjDVSYKUjFTpmMVvF6vShBV9hulA'
      
    };
   
    axios.request(options)
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
       <h1>Hey</h1>
    </div>
  );