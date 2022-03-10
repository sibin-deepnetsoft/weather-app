export const getWeatherData = ({lat, lon}:{lat:number, lon:number})=>{
    const { REACT_APP_API_KEY, REACT_APP_WEATHER_URL } =process.env;
    return fetch(`${REACT_APP_WEATHER_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${REACT_APP_API_KEY}`)
    .then(response => response.json())
}