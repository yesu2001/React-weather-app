import React,{useState,useEffect} from 'react';
import './App.css';
import Weather from './components/Weather.js'

function App() {
  let current_time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let amOrPm = current_time.split(' ')[1];
  const day_image = "https://images.unsplash.com/photo-1542709111240-e9df0dd813b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  const night_image = 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
  const [latitude,setLatitude] = useState([]);
  const [longitude,setLongitude] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => {
              setData(result)
            });
    }

    fetchData();
  },[latitude,longitude])


  return (
    <div style={{background: `url(${(amOrPm === 'AM') ? `${day_image}`:`${night_image}`})`, backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'}}className="App">
        {(typeof data.main != 'undefined') ? (
          <Weather weatherData={data}/>
        ): (
          <div>
            <p>Loading....</p>
          </div>
        )}
    </div>
  );
}



export default App;
