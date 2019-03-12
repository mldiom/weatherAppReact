import React from "react";
import Title from './components/title';
import Form from './components/form';
import Weather from './components/weather';

const APIkey = "da8feff9d085e6ae6706878e982820c5";

const State = {
  temperature: null,
  city: null,
  country: null,
  humidity: null,
  description: null,
  error: null
};

class App extends React.Component {

state = State;

onError = (errorMessage) => {
  this.setState({
    error: errorMessage
  });
}

  getWeather =  async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    this.setState(State);

    if (!city  || !country) {
      this.onError("Please enter a Value");
      return;
    }

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIkey}`);
      const data = await api_call.json();

        if (!data || (data && data.cod !== 200)) {
          this.onError(data ? data.message : "No data was found");
          return;
        }

      console.log(data);

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,

      })
}

  render() {
  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs7 form-container">
              <Form getWeather={this.getWeather}/>
              <Weather
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
};



export default App;
