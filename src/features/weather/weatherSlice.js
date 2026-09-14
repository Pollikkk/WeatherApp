import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherAPI } from './weatherAPI'

const initialState = {
  activeCity: 0,
  lon: null,
  lat: null,
  weatherData: null,
  forecastData: null,
}

export const fetchCity = createAsyncThunk(
    'weather/fetchCity',
    async (zip, thunkAPI) => {
      const response = await weatherAPI.fetchCity(zip)
      return response
    },
)

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({lat, lon}, thunkAPI) => {
      const response = await weatherAPI.fetchWeather(lat, lon)
      return response
    },
)

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({lat, lon}, thunkAPI) => {
      const response = await weatherAPI.fetchForecast(lat, lon)
      return response
    },
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeCity: (state, action) => {
        state.weatherData = null;
        state.forecastData = null;
        state.activeCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCity.pending, (state) => {
            state.lon = null;
            state.lat = null;
        })
        .addCase(fetchCity.fulfilled, (state, action) => {
            state.lon = action.payload.lon;
            state.lat = action.payload.lat;
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.weatherData = action.payload;
        })
        .addCase(fetchForecast.fulfilled, (state, action) => {
            state.forecastData = action.payload;
        })
  }
})

export const { changeCity } = weatherSlice.actions

export default weatherSlice.reducer