import React, { Component } from "react";
import * as api from "./api/api.js";
import { getIntervalArray, percentageToHsl } from "./utils/weatherUtils.js";
import { WELCOME, CURRENT, RANGE } from "./constants.js";
import UI from "./ui/";
import Display from "./display";
import Modal from "./modal";

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherResults: {},
      address: "",
      isLoading: false,
      coords: {
        lat: "",
        lng: ""
      },
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

  // get coords and address from google api
  getGeoCode = inputText => {
    this.setState({ isLoading: true });
    this.setState({ displayType: CURRENT });
    const _this = this;
    api
      .fetchGeoCode(inputText)
      .then(results => {
        const { lat, lng } = results.geometry.location;
        this.setState({
          coords: { lat: lat, lng: lng },
          address: results.formatted_address
        });
        return api.fetchCurrentWeather(lat, lng); //fetch weather based on those coords
      })
      .then(results => {
        this.setState({ weatherResults: results, isLoading: false });
      })
      .catch(function(error) {
        _this.showNetworkError()
        return error;
      });
  };
  //get coords from html5 geo location
  findCurrentPosition = () => {
    this.setState({ isLoading: true, displayType: CURRENT });
    const _this = this;
    api.getCurrentPosition()
      .then(results => {
        const { latitude, longitude } = results.coords;
        this.setState({ coords: { lat: latitude, lng: longitude } });
        return api.fetchCurrentWeather(latitude, longitude); //fetch weather based on those coords
      })
      .then(results => {
        this.setState({ weatherResults: results });
        return api.reverseGeoCode(this.state.coords.lat, this.state.coords.lng); //reverseGeoCode to get Address
      })
      .then(results => {
        this.setState({ address: results.formatted_address, isLoading: false });
      })
      .catch(function(error) {
        _this.setState({ isLoading: false, displayType: WELCOME });
        if (error !== "geoError") {//fail silently if auto geo error
          _this.showNetworkError()
        }
        return error;
      });
  };
  //called from Range submit
  setRangeInterval = (start, end, init) => {
    if (!this.state.address) {
      this.setState({
        modalOpen: true,
        alertText: "Please load a location first"
      });
      return;
    }
    this.setState({ isLoading: true });
    const arr = getIntervalArray(start, end, init); //returns array of unix timecodes
    //
    if (arr.length > 50) {
      this.setState({
        isLoading: false,
        modalOpen: true,
        alertText:"There is currently a limit of 50 intervals. Please select a new Date Range or interval"
      });
      return;
    }
    this.getArrayOfWeather(arr);
  };

  getArrayOfWeather = arr => {
    const { lat, lng } = this.state.coords;
    const promiseArr = api.fetchArrayOfWeather(arr, lat, lng); //create array of Promises
    //
    Promise.all(promiseArr)
      .then(response => {
        //all promises loaded
        const trimRes = response.map(item => {
          return item.currently;
        });
        this.setState({
          timeArr: trimRes,
          isLoading: false,
          displayType: RANGE
        });
      })
      .catch(function(err) {
        this.setState({
          isLoading: false,
          modalOpen: true,
          alertText: "Error loading wether data"
        });
      });
  };

  setTemp = temp => {
    const color = percentageToHsl(temp, 225, 0); //255 blue, to 0 red
    this.setState({ temp: temp, bgColor: color });
  };

  closModal = () => {
    this.setState({ modalOpen: false });
  };

  showNetworkError=()=>{
    this.setState({
            modalOpen: true,
            alertText: "Sorry! \n Problem retreiveing results. \n Please try again later"
          });
  }

  render() {
    const bgStyle = {
      backgroundColor: this.state.bgColor
    };
    return (
      <div className="container-fluid" style={bgStyle}>
        <UI
          getGeoCode={this.getGeoCode}
          setRangeInterval={this.setRangeInterval}
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
          <a href="https://darksky.net/poweredby" target="_blank">
            Powered by Dark Sky
          </a>
        </div>
        <Modal
          msg={this.state.alertText}
          onClose={this.closModal}
          show={this.state.modalOpen}
        />
      </div>
    );
  }
}

export default WeatherApp;