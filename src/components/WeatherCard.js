const WeatherCard = ({info}) =>{
    const city = info[0];
    const weather = info[1];
    const currentDate = new Date().toDateString();
    const currentTime = new Date().toLocaleTimeString('en-GB');    

    const weatherInfo = () =>{
        const hour = new Date().getHours();
        if (hour >= 6 && hour <18){
            return(
                <>
                <div>
                    <h4>Temperature</h4>
                    <p><span className="temperature-impress">{weather.maxTemp}</span><span className="temperature-celcius-degree">&#8451;</span></p>
                </div>
                <div>
                    <h4>Day time</h4>
                    <img src={`/icons/${weather.dayIcon}.svg`} alt={weather.dayIconPhrase} />
                    <p>{weather.dayIconPhrase}</p>
                </div>
                </>
            )
        }else{
            return(
                <>
                <div>
                    <h4>Temperature</h4>
                    <p><span className="temperature-impress">{weather.minTemp}</span><span className="temperature-celcius-degree">&#8451;</span></p>
                </div>
                <div>
                    <h4>Night time</h4>
                    <img src={`/icons/${weather.nightIcon}.svg`} alt={weather.nightIconPhrase} />
                    <p>{weather.nightIconPhrase}</p>
                </div>
                </>  
            )
        }

    }
    return(
        <section className="weather-card"> 
            <h3><span className="text-impress">{city.name}</span> - {city.country}</h3>    
            <p className="header-subtitle">{currentTime} - {currentDate}</p>
            <div className="weather-card-day-night">
                {weatherInfo()}
            </div>  
        </section>
    )
}

export default WeatherCard;