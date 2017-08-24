import React, { Component } from "react";
import * as api from "./api/api.js";
import {temperatureToHsl } from "./utils/weatherUtils.js";
import { WELCOME, CURRENT, RANGE } from "./constants.js";
import UI from "./ui/";
import Display from "./display";
import Modal from "./modal";

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherResults: {},
      isLoading: false,
      coords: {lat: "",lng: ""},
      timeArr: [],
      temp: "70",
      bgColor: "#666",
      displayType: WELCOME,
      modalOpen: false
    };
  }
  componentDidMount() {
    if ("geolocation" in navigator) {
      this.findCurrentPosition();
    } else {
      this.setState({ displayType: WELCOME });
    }
  }

  // get cur weather - top input
  getCurrentWeather = async (inputText) => {
    this.setState({ isLoading: true, displayType: CURRENT });
    try {
      let geoResults = await api.fetchGeoCode(inputText)
      const { lat, lng } = geoResults.geometry.location;
      let weathData = await  api.fetchCurrentWeather(lat, lng)
      
      this.setState({ weatherResults: weathData,
                      isLoading: false,
                      coords: { lat: lat, lng: lng },
                      address: geoResults.formatted_address
      });
       
    }catch(error) {
      this.showAlert("Sorry! \n Problem retreiveing results. \n Please try again later");
    }
  };
  //get coords from html5 geo location // triggered on load
  findCurrentPosition = async () => {
    this.setState({ isLoading: true, displayType: CURRENT });
    try {
      let coordinates = await api.getCurrentPosition(); //get coords
      const { latitude, longitude } = coordinates.coords;
      let weathData = await api.fetchCurrentWeather(latitude, longitude); //fetch weather based on those coords

      let address = await api.reverseGeoCode(latitude, longitude); //get address
      this.setState({ weatherResults: weathData,
                      coords: { lat: latitude, lng: longitude }, 
                      address: address.formatted_address, 
                      isLoading: false
                  })
    } catch (error) {
      this.setState({ isLoading: false, displayType: WELCOME });
      if (error !== "geoError") {//fail silently if auto geo error
        this.showAlert("Sorry! \n Problem retreiveing results. \n Please try again later");
      }
    }
  };
  //called from Range submit - lower inputs
  setRangeInterval = (intervalArr) => {
    if (!this.state.address) {
      this.showAlert("First, load a weather for a specific location.");
      return;
    }
    if (intervalArr.length > 50) {
      this.showAlert("There is currently a limit of 50 intervals. Please select a new date range or interval");
      return;
    }
    this.fetchWeatherArray(intervalArr);
  };

  fetchWeatherArray = async (intervalArr) => {
    this.setState({ isLoading: true });
    const { lat, lng } = this.state.coords;
    try {
      const results = await api.createWeatherPromises(intervalArr, lat, lng); //create array of Promises
      const filterResults = results.map(item => item);
      console.log(filterResults)
      this.setState({
            timeArr: filterResults,
            isLoading: false,
            displayType: RANGE })
    } catch (error) {
      this.showAlert("Error retreiving data for weather Range");
    }
  };

  setTemp = temp => {
    const color = temperatureToHsl(temp);
    this.setState({ temp: temp, bgColor: color });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  showAlert = msg => {
    this.setState({
      modalOpen: true,
      isLoading: false,
      alertText: msg
    });
  };

  render() {
    const bgStyle = {
      backgroundColor: this.state.bgColor
    };
    return (
      <div className="container-fluid" style={bgStyle}>
        <UI
          getCurrentWeather={this.getCurrentWeather}
          setRangeInterval={this.setRangeInterval}
          showAlert={this.showAlert}
        />
        <Display
          weatherData={this.state.weatherResults}
          address={this.state.address}
          timeArr={this.state.timeArr}
          setTemp={this.setTemp}
          isLoading={this.state.isLoading}
          displayType={this.state.displayType}
        />

        <div className="footer col-md-12">
          <a href="https://darksky.net/poweredby" target="_blank" rel="noopener noreferrer">
            Powered by Dark Sky
          </a>
        </div>
        <Modal
          msg={this.state.alertText}
          onClose={this.closeModal}
          show={this.state.modalOpen}
        />
      </div>
    );
  }
}

export default WeatherApp;