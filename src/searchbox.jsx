import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./searchbox.css";
import { useState } from 'react';

export default function Searchbox({updateinfo}){
    let [city,setCity]=useState("");
    const API_URL= "https://api.openweathermap.org/data/2.5/weather";
    const API_kEY= "16419cbd53d32fded036d8cee2362456";

    let getWeatherInfo=async ()=>{
        let response=await fetch (`${API_URL}?q=${city}&appid=${API_kEY}&units=metric `);
        let jsonResponse=await response.json();
        console.log(jsonResponse);
        
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
    };

    let handleChange = async(event)=>{
        setCity(event.target.value);
    };
    let handleSubmit =async (event)=>{
        event.preventDefault();
        console.log(city);
        setCity("");
        let newinfo= await getWeatherInfo();
        updateinfo(newinfo);
        
    };




    return (
        
        <div className='Searchbox'>
        
        <form onSubmit={handleSubmit}>
        <TextField id="City" 
        label="City Name"
         variant="outlined" 
          required value={city}
          onChange={handleChange}/>
        <br></br>
        <br></br>
        
        <Button variant="contained" type="submit">Search</Button>

        </form>
        </div>
        
    )

}