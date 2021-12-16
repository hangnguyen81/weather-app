import {useState} from 'react';
import Notification from './Notification';
import WeatherCard from './WeatherCard';


const cityBaseUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const weatherBaseUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/';
const apiKey = process.env.REACT_APP_API_KEY;

const FetchData = () =>{
  const [city, setCity] = useState('');
  const [cityWeather, setCityWeather] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorText = (message) =>{
    setErrorMessage(message);
    setTimeout(() => {setErrorMessage(null)}, 3000)
  } 

  const handleSubmit = async (event) =>{
    event.preventDefault()
    if (!city){
      errorText('Please enter name of a city');
      setLoading(false);
    }else{
      setCityWeather([]);
      setLoading(true);
  
      try {
        const response = await fetch(`${cityBaseUrl}?apikey=${apiKey}&q=${city}`);
        const cityData = await response.json();
        const cityInfo = {
          key: cityData[0].Key,
          name: cityData[0].EnglishName,
          country: cityData[0].Country.EnglishName
        };    
        try {
          const res = await fetch(`${weatherBaseUrl}${cityInfo.key}?apikey=${apiKey}&metric=true`)
          const weatherData = await res.json();
          const dailyForecasts = weatherData.DailyForecasts[0];
          const weatherInfo = {
            minTemp: dailyForecasts.Temperature.Minimum.Value,
            maxTemp: dailyForecasts.Temperature.Maximum.Value,
            dayIcon: dailyForecasts.Day.Icon,
            dayIconPhrase: dailyForecasts.Day.IconPhrase,
            nightIcon: dailyForecasts.Night.Icon,
            nightIconPhrase: dailyForecasts.Night.IconPhrase
          }
          setCityWeather([cityInfo,weatherInfo]);
          setLoading(false);
        } catch (error) {
          errorText('Weather info of this city is not available');
          setLoading(false);
        }
      } catch (error) {
        errorText('City is not found, please search again');
        setLoading(false);
      }
    }   
  }

    return(
        <>
        <section className='weather-app-search'>
            <form onSubmit={handleSubmit} className='search-form'> 
                <input 
                    type='text'
                    value={city}
                    onChange={({target})=>setCity(target.value)}
                    placeholder='...search a city'/>
                <button type='submit'>Show weather info</button>
            </form>
        </section>
        {loading? <p className='loading'>Loading...</p>:null}
        <Notification message={errorMessage} />
        {cityWeather.length !==0 && !loading 
            ? <WeatherCard info={cityWeather}/>
            : null
        }

      </>
    )
}

export default FetchData;