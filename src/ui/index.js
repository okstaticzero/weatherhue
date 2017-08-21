import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather.js'
import PastWeather from './PastWeather.js'
import logo from '../img/logo.png';
import './UI.css'

class UI extends Component {
   constructor(props){
    super(props)
    this.state={
      input:""
    }
  }

  render() {
    return (
      <div className="ui-container">
          <img className="logo" src={logo} alt="Logo" />
          <CurrentWeather 
            getGeoCode={this.props.getGeoCode}
           />
          <PastWeather
            setRangeInterval={this.props.setRangeInterval}
          />
      </div>  

    );
  }
}

export default UI