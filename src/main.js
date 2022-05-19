import React from 'react';
import Logo from './logo.svg';
import './main.css';
import Weather from "./components/weather";

const API_KEY = "4ee4aa3da3933127826ab0c875ff2d79";
let searchError = "";
let randomRender = 0;

class App extends React.Component {

  state = {
    country: [],
    city: ["Montreal", "Joinville", "Rio de Janeiro"],

    temperature: [],
    humidity: [],
    pressure: [],

    updateTime: [],
    isLoaded: false,
    error: [false, false, false]
  }

  constructor() {
    super();
    this.getWeather(false);
    this.buttonEventClickHandler = this.buttonEventClickHandler.bind(this);
  }

  refresh(parameter) {
    setTimeout(parameter, 600000);
  }

  getWeather = async (searchCalling) => {
    this.setState({ isLoaded: false });
    const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    var temperatures = [], pressures = [], humidities = [], countries = [], errors = [];
    var api_call = [], data = [];

    if (searchCalling) {
      let searchText = document.getElementById('txSearch');
      searchText.value = searchText.value.charAt(0).toUpperCase() + searchText.value.slice(1);
      if (searchText.value.toLowerCase() == this.state.city[0].toLowerCase()) {
        this.setState({
          city: [this.state.city[2], searchText.value, this.state.city[1]]
        });
      }
      else if (searchText.value.toLowerCase() == this.state.city[2].toLowerCase()) {
        this.setState({
          city: [this.state.city[1], searchText.value, this.state.city[0]]
        });
      }
      else if (searchText.value.toLowerCase() != this.state.city[1].toLowerCase()) {
        this.setState({
          city: [this.state.city[1], searchText.value, this.state.city[0]]
        });
      }
    }

    for (let index = 0; index < this.state.city.length; index++) {
      api_call[index] = (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city[index]}&appid=${API_KEY}&units=metric`));
      data[index] = (await api_call[index].json());

      //Data.Cod == 200, are equal to a "Okay" response from server.
      if (data[index].cod == '200') {
        countries[index] = data[index].sys.country;
        temperatures[index] = Math.round(data[index].main.temp);
        pressures[index] = Math.round(data[index].main.pressure);
        humidities[index] = data[index].main.humidity;
      }
      else {
        errors[index] = data[index].message.charAt(0).toUpperCase() + data[index].message.slice(1);
        this.setState({
          isLoaded: true
        });
      }
    }

    this.setState({
      country: countries,
      temperature: temperatures,
      pressure: pressures,
      humidity: humidities,
      updateTime: currentTime,
      isLoaded: true,
      error: errors
    });

    this.refresh(afterThis =>
      this.getWeather(false)
    );
  }

  renderBox(index) {
    const classes = ['divBoxTop', 'divBoxMiddle', 'divBoxBottom'];
    const expand = [false, true, false]
    return (
      <div className={classes[index]}>
        <Weather
          country={this.state.country[index]}
          city={this.state.city[index]}
          temperature={this.state.temperature[index]}
          humidity={this.state.humidity[index]}
          pressure={this.state.pressure[index]}
          updateTime={this.state.updateTime}
          isLoaded={this.state.isLoaded}
          expand={expand[index]}
          error={this.state.error[index]}
        />
      </div>
    );
  }

  Searchweather() {
    console.log(searchError);
    return (
      React.createElement('div', { className: 'divSearch' },
        React.createElement('div', { className: 'divText' },
          React.createElement('input', { id: 'txSearch', type: 'text', name: 'fname', placeholder: "Type a city to search", onKeyPress: this.txSearchKeyPress })),
        React.createElement('div', { className: 'divButton' }),
        React.createElement('input', { type: 'button', value: 'Search', onClick: this.buttonEventClickHandler }),
        React.createElement('p', { id: 'pSearchError', className: 'labelSearchError' })
      )
    );
  }

  txSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.buttonEventClickHandler();
    }
  }

  buttonEventClickHandler = async (event) => {
    var searchText = document.getElementById('txSearch');
    const api_call_tester = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText.value}&appid=${API_KEY}&units=metric`);
    const data_tester = await api_call_tester.json();

    var searchError = document.getElementById('pSearchError');
    if (!data_tester.message) {
      searchError.innerText = "";
      searchText.style.borderColor = "green";
      this.getWeather(true);
    }
    else {
      searchError.innerText = data_tester.message.charAt(0).toUpperCase() + data_tester.message.slice(1);
      searchText.style.borderColor = "#ED1946";
      searchText.focus();
    }
  }

  render() {
    return (
      <div className="divCenter">
        <header className="headerTopFix">
          <img src={Logo} alt="logo" height="50px" width="165px" />
        </header>
        {this.Searchweather()}
        {this.renderBox(0)}
        {this.renderBox(1)}
        {this.renderBox(2)}
      </div>
    );
  }
}

export default App;
