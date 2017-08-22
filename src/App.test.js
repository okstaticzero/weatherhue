import React from 'react';
import ReactDOM from 'react-dom';
import {temperatureToHsl, getIntervalArray } from "./utils/weatherUtils.js";
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


test('converts any number above 100 to hsl hue of 100', () => {
  expect(
    temperatureToHsl(120)
  ).toBe("hsl(0, 100%, 45%)");
});

test('converts 100 to hsl hue of 0', () => {
  expect(
    temperatureToHsl(100)
  ).toBe("hsl(0, 100%, 45%)");
});

test('converts -10 to hsl hue of 255', () => {
  expect(
    temperatureToHsl(-10)
  ).toBe("hsl(255, 100%, 45%)");
});

test('converts any number below -10 to hsl hue of 255', () => {
  expect(
    temperatureToHsl(-30)
  ).toBe("hsl(255, 100%, 45%)");
});



test('return array of timestamps betwen value1 and 2, each value larger by 21600', () => {
  expect(
    getIntervalArray(1500652304, 1500738704, 21600)
  ).toEqual([ 1500652304,
              1500673904,
              1500695504,
              1500717104,
              1500738704]);
});


test('return array of timestamps betwen value1 and 2, each value larger by the specified interval', () => {
  expect(
    getIntervalArray(1488383504, 1488469904, 43200)
  ).toEqual([ 1488383504,
              1488426704,
              1488469904]);
});