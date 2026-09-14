import { useSelector } from 'react-redux'

import { PLACES } from '../../../data/data.js'
import { ErrorState, LoadingState } from './WeatherStates'
import {
  formatTemperature,
  formatWindSpeed,
  getWeatherIconUrl,
  isValidWeatherData,
} from './weatherHelpers'

import './styles.css'

function WeatherDisplay() {
  const weatherData = useSelector(
    (state) => state.weather.weatherData
  )

  const activeCity = useSelector(
    (state) => state.weather.activeCity
  )

  const selectedPlace = PLACES[activeCity]

  if (!weatherData) {
    return <LoadingState />
  }

  if (
    !selectedPlace ||
    !isValidWeatherData(weatherData)
  ) {
    return <ErrorState />
  }

  const weather = weatherData.weather[0]
  const { main, wind } = weatherData

  return (
    <section className="weather-display">
      <h2>
        {weather.main} in {selectedPlace.name}

        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
        />
      </h2>

      <p>Current: {formatTemperature(main.temp)}</p>
      <p>Feels like: {formatTemperature(main.feels_like)}</p>
      <p>High: {formatTemperature(main.temp_max)}</p>
      <p>Low: {formatTemperature(main.temp_min)}</p>
      <p>Wind speed: {formatWindSpeed(wind.speed)}</p>
    </section>
  )
}

export default WeatherDisplay