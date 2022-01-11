import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state: {
    weather: '',
    locationSearchString: '',
    zipCode: ''
  },
  getters: {
    weatherData: state => state.weather,
    favWeather: state => state.favWeather ,
    loginData: state => state.loginData
  },
  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
    },
    SET_SEARCHSTRING (state, locationSearchString) {
      console.log(locationSearchString)
      state.locationSearchString = locationSearchString
    }
  },
  actions: {
    setWeather ({ commit }, weather) {
      commit('SET_WEATHER', weather)
    },
    setLocation ({ commit, dispatch }, locationSearchString) {
      console.log(locationSearchString)
      commit('SET_SEARCHSTRING', locationSearchString)
      dispatch('getWeather')
    },
    lookupLocationByZip ({ commit }, zip) {
      const apiKey = 'bqfkH2mN49AwnuBkPBkaOMblKlGk7vFAnfdg2S1pk16ZzQuMTTEhQgdKZ1ye2uWj'
      const apiUrl = `http://www.zipcodeapi.com/rest/${apiKey}/info.json/${zip}/degrees`
      axios.get(apiUrl
      //   , {
      //   headers: { //headers go here
      //     'Access-Control-Allow-Origin' : 'http://localhost:8081'
      //   }
      // }
      )
      .then(response => {
        console.log(response.data)
        // if the response is successful, update the location

        commit('SET_SEARCHSTRING', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getWeather ({ commit, state }) {
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
      const appId = '75105c22424878900ef3a764236b2549'
      axios.get(`${apiUrl}?q=${state.locationSearchString.city},&appid=${appId}`)
      .then(response => {
        console.log(response.data)
        // if the response is successful, update the weather

        commit('SET_WEATHER', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
})

export default store
