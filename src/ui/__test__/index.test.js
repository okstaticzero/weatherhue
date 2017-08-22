import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UI from '../index.js'
import CurrentWeather from '../CurrentWeather.js'
import PastWeather from '../PastWeather.js'

it('should rener the UI component', () => {
  const wrapper = shallow(<UI />);
  expect(wrapper).toMatchSnapshot();
});

it('should rener the CurrentWeather component', () => {
  const wrapper = shallow(<CurrentWeather />);
  expect(wrapper).toMatchSnapshot();
});


it('should rener the PastWeather component', () => {
  const wrapper = shallow(<PastWeather />);
  expect(wrapper).toMatchSnapshot();
});