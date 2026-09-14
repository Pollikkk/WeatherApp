import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Nav, Row } from 'react-bootstrap'

import {
  changeCity,
  fetchCity,
  fetchForecast,
  fetchWeather,
} from '../weatherSlice'

import ForecastDisplay from './ForecastDisplay'
import WeatherDisplay from './WeatherDisplay'
import { PLACES } from '../../../data/data.js'

function WeatherSection() {
  const dispatch = useDispatch()

  const {
    activeCity,
    lat,
    lon,
  } = useSelector((state) => state.weather)

  const selectedPlace = PLACES[activeCity]

  useEffect(() => {
    if (!selectedPlace) {
      return
    }

    dispatch(fetchCity(selectedPlace.zip))
  }, [dispatch, selectedPlace])

  useEffect(() => {
    if (lat == null || lon == null) {
      return
    }

    const coordinates = { lat, lon }

    dispatch(fetchForecast(coordinates))
    dispatch(fetchWeather(coordinates))
  }, [dispatch, lat, lon])

  const handleCitySelect = (cityIndex) => {
    const nextCityIndex = Number(cityIndex)

    if (nextCityIndex !== activeCity) {
      dispatch(changeCity(nextCityIndex))
    }
  }

  return (
    <main className="weather-app" data-testid="weather">
      <div className="weather-container">
        <h1 className="weather-title">
          Weather forecast
        </h1>

        <Row className="g-4">
          <Col md={4} sm={12}>
            <section className="city-panel">
              <h3>Select a city</h3>

              <Nav
                variant="pills"
                activeKey={activeCity}
                onSelect={handleCitySelect}
                className="flex-column"
              >
                {PLACES.map((place, index) => (
                  <Nav.Link
                    key={place.zip ?? place.name}
                    eventKey={index}
                  >
                    {place.name}
                  </Nav.Link>
                ))}
              </Nav>
            </section>
          </Col>

          <Col md={8} sm={12}>
            <WeatherDisplay />
          </Col>
        </Row>

        <h2 className="forecast-title">
          Forecasts for 6 days
        </h2>

        <ForecastDisplay />
      </div>
    </main>
  )
}

export default WeatherSection