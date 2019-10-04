import React from 'react';
import {Weather} from './App';
import ReactTestRenderer from 'react-test-renderer';

console.log(Weather);

it('renders correctly', () => {
    const data ={ 
        name: "Los Angeles",
        weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01n"}],
        main: { temp: 78}
    };

    const renderer = ReactTestRenderer.create(<Weather data={data}/>);
    expect(renderer.toJSON()).toMatchSnapshot();
    console.log(renderer.toJSON());
  });

test('the fetch data has weather and temparature', () => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=Azusa&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
  .then(res => res.json()).then(data => {
    expect(data).toHaveProperty('weather');
    expect(data).toHaveProperty(['main', 'temp']);
  });
});