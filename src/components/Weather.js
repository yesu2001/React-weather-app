import React from 'react';
import './weather.css';
import Sunny from '../Images/Sunny.png';
import Cloudy from '../Images/cloudy.png';

function Weather({weatherData}) {
  const temperature = weatherData.main.temp;
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = weekday[new Date().getDay()];
  let current_time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let amOrPm = current_time.split(' ')[1];
  return(
    <div className="weather">
      <div className="container">
        <div className="container_head">
          <p>{day} {current_time}</p>
          <h2>{weatherData.name}</h2>
        </div>
        <div className="container_body">
          <div>
              <img className="weather_icon" src={(temperature > 25) ? `${Sunny}`:`${Cloudy}`}/>
          </div>
          <div>
            <h1>{temperature} &deg;C</h1>
          </div>
        </div>
        <div className="container_foot">
          <p><span>Humidity :</span> {weatherData.main.humidity} %</p>
          <p><span>Pressure :</span> {weatherData.main.pressure}</p>
          <p><span>Wind :</span> {weatherData.wind.speed} Km/h</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
