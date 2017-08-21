import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherApp from './WeatherApp.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <WeatherApp />, 
  document.getElementById('root'));
registerServiceWorker();
