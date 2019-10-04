import React, { Component } from 'react';
import 'isomorphic-fetch'; //We need this statement to use the Fetch API. You will also need to install isomorphic-fetch ('npm install --save isomorphic-fetch es6-promise') for
//this code to work when you write your own code with the Fetch API. This was already done when you 'npm install'ed this project
import './App.css';
import {Card, FormControl, InputGroup} from 'react-bootstrap';

console.log('process.env.REACT_APP_WEATHER_API_KEY', process.env.REACT_APP_WEATHER_API_KEY);

export const Weather = (props) => {
    return (
        <Card style={{}}>
            <Card.Header style={{textTransform: "capitalize"}}>{props.data.name}</Card.Header>
            <Card.Img xs={4} variant="top" src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} />
            <Card.ImgOverlay>
                <Card.Title style={{fontSize: '50px', textAlign: 'center', marginTop: '360px'}}>{props.data.main.temp}&#176;F</Card.Title>
            </Card.ImgOverlay>
            <Card.Body>
                <Card.Title style={{textAlign: "center"}}>{props.data.weather[0].main}</Card.Title>
                <Card.Text style={{textAlign: "center"}}>{props.data.weather[0].description}</Card.Text>
            </Card.Body>
        </Card>
    );
} 

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            data: {},
            city: ''
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.fetchCityWeather = this.fetchCityWeather.bind(this);
    }
    componentDidMount() {
    }

    handleChange (e){
        this.setState({city: e.target.value});
    }
    handleKeyPress(target){
        if(target.charCode===13){
            return this.fetchCityWeather()  
          } 
    }

    fetchCityWeather(){
        const city = this.state.city;
        console.log("city", city);
        this.setState({isLoading: true});
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.split(" ").join("+")}&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(
            (data) => {
                console.log("data", data);
                this.setState({
                    isLoading: false,
                    data
                });
            },
            // Note: it's important to handle errors here  instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log("error", error);
                this.setState({
                    isLoading: false,
                    error
                });
            })
    }
    
    _renderWeather(){
        let { error, isLoading, data } = this.state;
        console.log(" error", error, "isLoaded", isLoading, 'dara', data);
        
        if (error) {
            return <div>Error: {error.message}</div>;
        }else if (data.hasOwnProperty('message')){
            console.log("I'm here 2");
            return <div style={{textTransform: "capitalize"}}>{data.message}</div>;
        }else if (isLoading) {
            return <div>Loading...</div>;
        }else if (data.hasOwnProperty('weather')) {
            console.log("I'm here 3");
            return <Weather data={data}/>
        }else{
            return ""
        }
    }

    render() {
     return(
        <div style={{ maxWidth: "500px", margin: "0 auto", padding:"50px"}}>  
            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
            <InputGroup className="mb-3">
                <FormControl
                placeholder="City"
                aria-label="City"
                aria-describedby="city-addon"
                value={this.state.city}
                onChange = {this.handleChange}
                onKeyPress={this.handleKeyPress}
                />
                <InputGroup.Append>
                    <button className="primary" type="button" onClick={this.fetchCityWeather}>Weather me!</button>
                </InputGroup.Append>
            </InputGroup>
            {this._renderWeather()}
        </div>

     )
    }
}
