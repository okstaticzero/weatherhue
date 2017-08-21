import axios from "axios";
import DarkSkyApi from "dark-sky-api";

const GOOGLE_KEY = "AIzaSyAiJh_I1d1_2vz_fu5evc84EoVrW4Vyj6w";
const GOOGLE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const DARKSKY_KEY = "dc0cc0c836806fc169a9d2f84ee4a437";
DarkSkyApi.apiKey = DARKSKY_KEY;
DarkSkyApi.extendHourly(false);

const DSapi = new DarkSkyApi(DARKSKY_KEY);

export const fetchGeoCode = str => {
  return axios
    .get(`${GOOGLE_BASE_URL}?address=${str}&key=${GOOGLE_KEY}`)
    .then(function(response) {
      return response.data.results[0];
    })
    .catch(function(error) {
      //console.log("Errro Fetching lat lang"+ error);
      return error;
    });
};

export const reverseGeoCode = (lat, lng) => {
  return axios
    .get(`${GOOGLE_BASE_URL}?latlng=${lat},${lng}&key=${GOOGLE_KEY}`)
    .then(function(response) {
      return response.data.results[0];
    })
    .catch(function(error) {
      return error;
    });
};

export const fetchArrayOfWeather = (arr, lat, lng) => {
  //array of unix timecodes
  const position = { latitude: lat, longitude: lng };
  //create an array of promises
  const promiseArr = arr.map(item => {
    return new Promise((resolve, reject) => {
      DSapi.position(position)
        .loadTime(item)
        .then(res => {
          resolve(res);
        })
        .catch(function(error) {
          console.log("Error in Promise.all");
          return error;
        });
    });
  });

  return promiseArr;
};

export const fetchCurrentWeather = (lat, lng) => {
  return new Promise((reslove, reject) => {
    const position = {
      latitude: lat,
      longitude: lng
    };
    return DarkSkyApi.loadCurrent(position)
      .then(result => {
        reslove(result);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

export const getCurrentPosition = function(options) {
  return new Promise(function(resolve, reject) {
    function error() {
      reject("geoError");
    }
    navigator.geolocation.getCurrentPosition(resolve, error);
  });
};
