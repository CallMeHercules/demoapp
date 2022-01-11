<template>
  <div class="weather">
    <!-- display weather here -->
    
    <input 
      v-model="zipCode" 
      type="text" 
      label="Location" 
      placeholder="Location Search"
      @input="updateZipCode">
    <!-- buttons can be useful for testing / debugging -->
    <button @click="getWeather">Refresh Weather</button>
    <button @click="updateZipCode">Lookup ZipCode</button>

    <div 
      v-if=
        "typeof weatherData.main != 'undefined'" 
      class="weather__wrap">
      <img 
        :src="getImgUrl(weatherData)" 
        v-
        bind:alt="weatherData">
      <h1>{{ weatherData.name }}</h1>
      <h2>{{ Math.round((weatherData.main.temp-273.15)*1.8)+32 }} &deg;F</h2>
      <h3>{{ weatherData.weather[0].main }}</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Start',
  data () {
    return {
      zipCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'weatherData'
    ])
  },
  methods: {
    updateZipCode () {
      console.log('updateZipCode', this.zipCode)
      if (this.zipCode && this.zipCode.length === 5) {
        this.lookupLocationByZip(this.zipCode)
        this.getWeather()
      }
    },
    getImgUrl(weatherData) {
      return 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'
    },
    ...mapActions(['getWeather', 'setZipCode', 'lookupLocationByZip'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.weather__wrap {  
  position: relative;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  text-align: center;
  color: black;
  background-color: whitesmoke;
  box-shadow:  0px 0px 50px 3px rgba(0,0,0,0.1), 
    0px 0px 50px 3px rgba(0,0,0,0.1), 
    0px 0px 50px 3px rgba(0,0,0,0.1), 
    0 8px 8px rgba(0,0,0,0.1),
    0 16px 16px rgba(0,0,0,0.1);
}
</style>
