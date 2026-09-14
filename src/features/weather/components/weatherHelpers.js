const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn'

export function isValidWeatherData(weatherData) {
  return Boolean(
    weatherData?.weather?.[0]?.main &&
    weatherData?.weather?.[0]?.description &&
    weatherData?.weather?.[0]?.icon &&
    weatherData?.main?.temp !== undefined &&
    weatherData?.main?.feels_like !== undefined &&
    weatherData?.main?.temp_max !== undefined &&
    weatherData?.main?.temp_min !== undefined &&
    weatherData?.wind?.speed !== undefined
  )
}

export function formatTemperature(value) {
  return `${value.toFixed(1)}°C`
}

export function formatWindSpeed(value) {
  return `${value.toFixed(2)} m/s`
}

export function getWeatherIconUrl(iconCode) {
  return `${WEATHER_ICON_URL}/${iconCode}.png`
}