import { useEffect, useState } from "react";
import axios from "axios";

const DataOfTheCountry = ({ name, capital, area, languages, flag }) => {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=464da8614c0896342688a7f312363302&units=metric`
      )
      .then((response) => setWeatherData(response.data))
      .catch(() => console.log("Not found"));
  }, []);
  const weatherIcon = weatherData.weather;
  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <span>languages</span>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="#" />
      <h3>Weather in {capital}</h3>
      <p>temperature {weatherData?.main?.temp} Celcius</p>
      {weatherIcon && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon[0].icon}@2x.png`}
          alt="#"
        />
      )}
      <p>wind {weatherData?.wind?.speed} m/s</p>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data))
      .catch(() => console.log("Not found"));
  }, []);

  const filteredCountries = value
    ? allCountries.filter((i) =>
        i.name.common.toLowerCase().includes(value.toLowerCase())
      )
    : [];
  return (
    <div>
      <p>
        find countries{" "}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter country..."
        />
      </p>
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((i) => (
          <p key={i.name.common}>
            {i.name.common}{" "}
            <button onClick={() => setValue(i.name.common)}>show</button>
          </p>
        ))}
      {filteredCountries.length === 1 && (
        <DataOfTheCountry
          name={filteredCountries[0].name.common}
          capital={filteredCountries[0].capital}
          area={filteredCountries[0].area}
          languages={filteredCountries[0].languages}
          flag={filteredCountries[0].flags.png}
        />
      )}
    </div>
  );
};
export default App;
