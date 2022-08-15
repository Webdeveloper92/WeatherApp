import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSmog,
  faSmoking,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [weather, setWeatherDetail] = useState("");
  const [temp, setTemp] = useState("");
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const apiKey = "a85de0f1cccf00c1e401d5f907f2629c";
  const apiRequest = async (e) => {
    e.preventDefault();
    const location = e.target.elements.loc.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const request = axios.get(url);
    const result = await request;

    console.log(weather);
    let temp_min = (result.data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (result.data.main.temp_max - 273.15).toFixed(2);
    let temp_normal = (result.data.main.temp - 273.15).toFixed(2);
    setTemp({
      temp_normal: temp_normal,
      temp_max: temp_max,
      temp_min: temp_min,
    });
    console.log(result.data);
    setWeatherDetail({
      weatherdesp: result.data.weather[0].main,
      weathercity: result.data.name,
    });

    if (typeof result.data != "undefined") {
      if (result.data.weather[0].main == "Clouds") {
        setEmoji({ pic: faCloud });
      } else if (result.data.weather[0].main == "Thunder") {
        setEmoji({ pic: faBolt });
      } else if (result.data.weather[0].main == "Drizzle") {
        setEmoji({ pic: faCloudRain });
      } else if (result.data.weather[0].main == "Rain") {
        setEmoji({ pic: faCloudShowersHeavy });
      } else if (result.data.weather[0].main == "Snow") {
        setEmoji({ pic: faSnowflake });
      } else if (result.data.weather[0].main == "Smoke") {
        setEmoji({ pic: faSmog });
      } else if (result.data.weather[0].main == "clear") {
        setEmoji({ pic: faSun });
      } else {
        setEmoji(faSmog);
      }
    }
  };
  const WeatherInfo = () => {
    return (
      <div class="bg-dark bg-opacity-50 py-3">
        <h2 class="card-title">{weather?.weathercity}</h2>
        <p class="card-text lead">Saturday,October 14,2021</p>
        <hr />
        <FontAwesomeIcon icon={emoji?.pic} size="6x"></FontAwesomeIcon>
        <h1 className="fw-bolder mb-5">{temp?.temp_normal}&deg;C</h1>
        <h1 className="lead fw-bolder mb-5">{weather?.weatherdesp}</h1>
        <p className="lead">
          {temp?.temp_min}&deg;| {temp?.temp_max}&deg;C
        </p>
      </div>
    );
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-4 ">
        <div class="card text-center text-white border-0">
          <img
            src={"https://source.unsplash.com/600x900/?" + weather?.weatherdesp}
            class="card-img"
            alt="..."
          />
          <div class="card-img-overlay">
            <form onSubmit={apiRequest}>
              <div class="input-group mb-4 w-75 mx-auto">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search City"
                  aria-label="Search City"
                  aria-describedby="basic-addon2"
                  name="loc"
                />

                <button class="input-group-text" id="basic-addon2">
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
              </div>
            </form>

            {weather && <WeatherInfo />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
