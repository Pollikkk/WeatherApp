import { Col } from 'react-bootstrap'
import { days } from '../../../data/data.js'

const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn'

function getDayName(timestamp) {
  const date = new Date(timestamp * 1000)

  return days[date.getDay()] ?? 'Unknown day'
}

function getWeatherIconUrl(iconCode) {
  return `${WEATHER_ICON_URL}/${iconCode}.png`
}

function formatTemperature(value) {
  return `${value.toFixed(1)}°C`
}

function ForecastDay({ forecast }) {
  const weather = forecast.weather[0]

  return (
    <Col md={2} sm={6} xs={12}>
      <article className="forecast-card">
        <h3>{getDayName(forecast.dt)}</h3>
    
        <h4>
          {weather.main}
    
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
          />
        </h4>
    
        <p>Day: {formatTemperature(forecast.temp.day)}</p>
        <p>Feels like: {formatTemperature(forecast.feels_like.day)}</p>
        <p>High: {formatTemperature(forecast.temp.max)}</p>
        <p>Low: {formatTemperature(forecast.temp.min)}</p>
        <p>Wind speed: {forecast.speed} m/s</p>
      </article>
    </Col>
  )
}

export default ForecastDay