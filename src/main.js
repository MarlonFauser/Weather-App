import React from 'react';
import Logo from './logo.svg';
import './main.css';
import Weather from "./components/weather";

const API_KEY = "66b518fd6a1ee055b9a133bd70fa79ab";

class App extends React.Component {

  state = {
    country: ["GL", "BR", "KE"],
    city: ["Nuuk", "Urubici", "Nairobi"],

    temperature: [],
    humidity: [],
    pressure: [],

    updateTime: [],
    isLoaded: false,
    error: [false, false, false]
  }

  constructor() {
    super();
    this.getWeather();
  }

  refresh(parameter) {
    setTimeout(parameter, 600000);
  }

  getWeather = async () => {
    this.setState({ isLoaded: false });

    const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    var temperatures = [], pressures = [], humidityes = [], errors = [];
    var api_call = [], data = [];

    for (let index = 0; index < this.state.city.length; index++) {
      api_call[index] = (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city[index]},${this.state.country[index]}&appid=${API_KEY}&units=metric`));
      data[index] = (await api_call[index].json());

      //Data.Cod == 200, are equal to a "Okay" response from server.
      if (data[index].cod == "200") {
        temperatures[index] = (Math.round(data[index].main.temp));
        pressures[index] = (Math.round(data[index].main.pressure));
        humidityes[index] = (data[index].main.humidity);
      }
      else {
        errors[index] = data[index].message != undefined;
        this.setState({
          isLoaded: true
        });
      }
    }

    this.setState({
      temperature: temperatures,
      pressure: pressures,
      humidity: humidityes,
      updateTime: currentTime,
      isLoaded: true,
      error: errors
    });

    this.refresh(afterThis =>
      this.getWeather()
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

  render() {
    return (
      <div className="divCenter">
        <header className="headerTopFix">
          <img src={Logo} alt="logo" height="50px" width="165px" />
        </header>
        {this.renderBox(0)}
        {this.renderBox(1)}
        {this.renderBox(2)}
      </div>
    );
  }
}

export default App;
