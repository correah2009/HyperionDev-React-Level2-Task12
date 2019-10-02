import React, { Component } from 'react';
import 'isomorphic-fetch'; //We need this statement to use the Fetch API. You will also need to install isomorphic-fetch ('npm install --save isomorphic-fetch es6-promise') for
//this code to work when you write your own code with the Fetch API. This was already done when you 'npm install'ed this project
import './App.css';
import {Card, FormControl, InputGroup, Button} from 'react-bootstrap';

console.log('process.env.REACT_APP_WEATHER_API_KEY', process.env.REACT_APP_WEATHER_API_KEY);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            city: "", 
            weather: []
        };

    this.fetchCityWeather = this.fetchCityWeather.bind(this);

    this.city = React.createRef();
    }
    componentDidMount() {
    }

    fetchCityWeather(){
        const city = this.city.current.value;
        console.log("this.city.current.value", this.city.current.value);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.split(" ").join("+")}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                this.setState({
                    isLoaded: true,
                    result
                });
            },
            // Note: it's important to handle errors here  instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log("error", error);
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }
    
    _renderWeather(){
        let { error, isLoaded, result } = this.state;
        console.log(" error", error, "isLoaded", isLoaded, 'weather', weather);
        const weather = (typeof result === "undefined")? [] : result.weather;
        if(weather.length === 0){
            return ""
        } else if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (weather.length > 0) {
            return (
                <Card style={{}}>
                    <Card.Header style={{textTransform: "capitalize"}}>{result.name}</Card.Header>
                    <Card.Img xs={4} variant="top" src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
                    <Card.Body>
                        <Card.Title style={{textAlign: "center"}}>{weather[0].main}</Card.Title>
                        <Card.Text style={{textAlign: "center"}}>{weather[0].description}</Card.Text>
                    </Card.Body>
                </Card>
            );
        } else {
            return "";
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
                ref={this.city}
                />
                <InputGroup.Append>
                <button variant="primary" type="button" onClick={this.fetchCityWeather}>Weather me!</button>
                </InputGroup.Append>
            </InputGroup>
            {this._renderWeather()}
        </div>

     )
    }
 }


 export default App;