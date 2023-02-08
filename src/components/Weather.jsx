import DisplayWeather from "./DisplayWeather";
import { useState } from "react";


function Weather() {
    const [weather, setWeather] = useState([])
    const [form, setForm] = useState({
        city: '',
        country: ''
    })

    const API_KEY = '0c1c948dcae4d95e3a561169b3c3281f'

    const weatherData = async(e) => {
        e.preventDefault()
        if(form.city === '') {
            alert('Add Values')
        } else {
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => data)

            setWeather( {data: data} )
        }
    } 

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if(name === 'city') {
            setForm({ ...form, city: value})
        }
        if(name === 'country') {
            setForm({...form, country: value})
        }
    }

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input type="text" placeholder="Enter City Name"
        name="city"
        onChange={(e) => handleChange(e)}/>
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input type="text" placeholder="Enter Country"
        name="country"
        onChange={(e) => handleChange(e)}/>
        <button className="getweather" onClick={(e) => weatherData(e)}>Go</button>
      </form>

      {weather.data !== undefined ? (
        <div>
            <DisplayWeather data={weather.data}/>
        </div>
      ) : null} 
    </div>
  )
}

export default Weather
