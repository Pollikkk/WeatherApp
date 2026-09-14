import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import ForecastDay from './ForecastDay'
import './styles.css'

function LoadingState() {
  return (
    <div className="d-flex flex-row">
      <p className="loading">Loading...</p>
      <div className="spinner" />
    </div>
  )
}

function ErrorState() {
  return (
    <div className="d-flex flex-row" data-testid="error">
      <p className="loading">Error in response</p>
    </div>
  )
}

function isValidForecastDay(day) {
  return Boolean(
    day?.weather?.[0]?.main &&
    day?.weather?.[0]?.description &&
    day?.weather?.[0]?.icon &&
    day?.dt !== undefined &&
    day?.temp?.day !== undefined &&
    day?.feels_like?.day !== undefined &&
    day?.temp?.max !== undefined &&
    day?.temp?.min !== undefined &&
    day?.speed !== undefined
  )
}

function ForecastDisplay() {
  const forecastData = useSelector(
    (state) => state.weather.forecastData
  )

  if (!forecastData) {
    return <LoadingState />
  }

  if (
    !Array.isArray(forecastData.list) ||
    forecastData.list.length === 0 ||
    forecastData.list.some((day) => !isValidForecastDay(day))
  ) {
    return <ErrorState />
  }

  return (
    <Row data-testid="forecast">
      {forecastData.list.map((forecast) => (
        <ForecastDay
          key={forecast.dt}
          forecast={forecast}
        />
      ))}
    </Row>
  )
}

export default ForecastDisplay