import React, { Component } from 'react';
import Details from './Details.js'
import Slider from 'rc-slider';
import loader from '../img/rings.svg';
import 'rc-slider/assets/index.css';
import './Display.css'

class UI extends Component {
   constructor(props){
    super(props)
    this.state={
      timeWeather:{}, //weather object updated from slider
      timeLength:0
    }
  }
  
  componentWillReceiveProps(nextProps){
    //check if received a timeArr
    if(nextProps.timeArr !== this.props.timeArr){
     //
     this.setState({timeLength: nextProps.timeArr.length})
     //set weather to first date
      this.setWeatherData(nextProps.timeArr[0])
    }
    //check weather data  //coming from current weather
    if(nextProps.weatherData !== this.props.weatherData){
      //set wheather when current weather updated
     this.setWeatherData(nextProps.weatherData)
    }
  }
  
  sliderChange = (ind)=>{
    //change weather data when slider changes
    this.setWeatherData(this.props.timeArr[Number(ind)])
  }

  setWeatherData =(obj)=>{
    this.setState({
      timeWeather:obj
    })
    this.props.setTemp(Math.round(obj.currently.temperature))
  }

  render() {
    return (
      <div className="main-display">
        <div className="display-container ">
        {this.props.isLoading &&
          <img className="loader" width="140" height="140" src={loader} alt="Logo" />
        }
        {!this.props.isLoading &&
          <Details 
            showSlider={this.props.showSlider}
            address={this.props.address}
            weatherData={this.state.timeWeather}
            displayType={this.props.displayType}
             />
        }
        
        </div>  
        <br/>
        <div className="display-container ">
          {this.props.displayType === "RANGE" &&
            <Slider
             className="sliderOuter"
             dots={true}
             onChange={this.sliderChange}
             min={0}
             max={this.state.timeLength-1}
             step={1}
             />
          }
        </div> 
     </div> 
    );
  }
}

export default UI