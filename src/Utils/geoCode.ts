export const geoCode = (city:string)=>{
    const { REACT_APP_API_KEY, REACT_APP_WEATHER_URL } =process.env;
    return fetch(`${REACT_APP_WEATHER_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${REACT_APP_API_KEY}`)
    .then(response => response.json())
}