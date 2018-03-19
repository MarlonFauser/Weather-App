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

    const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

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

  render() {
    return (
      <div className="divCenter">
        <header className="headerTopFix">
          <img src={Logo} alt="logo" height="50px" width="165px" />
        </header>
        <div className="contentPane">
          <div className="divBoxTop">
            <Weather
              country={this.state.country[0]}
              city={this.state.city[0]}
              temperature={this.state.temperature[0]}
              humidity={this.state.humidity[0]}
              pressure={this.state.pressure[0]}
              updateTime={this.state.updateTime}
              isLoaded={this.state.isLoaded}
              expand={false}
              error={this.state.error[0]}
            />
          </div>
          <div className="divBoxMiddle">
            <Weather
              country={this.state.country[1]}
              city={this.state.city[1]}
              temperature={this.state.temperature[1]}
              humidity={this.state.humidity[1]}
              pressure={this.state.pressure[1]}
              updateTime={this.state.updateTime}
              isLoaded={this.state.isLoaded}
              expand={true}
              error={this.state.error[1]}
            />
          </div>
          <div className="divBoxBottom">
            <Weather
              country={this.state.country[2]}
              city={this.state.city[2]}
              temperature={this.state.temperature[2]}
              humidity={this.state.humidity[2]}
              pressure={this.state.pressure[2]}
              updateTime={this.state.updateTime}
              isLoaded={this.state.isLoaded}
              expand={false}
              error={this.state.error[2]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
