import { useCallback, useEffect, useState } from 'react';
import { geoCode  } from '../Utils/geoCode';
import { getWeatherData } from '../Utils/getWeatherData';
import { TextField, Grid } from '@mui/material';
import _ from 'lodash';
import * as moment from 'moment';
import "moment-timezone";
import ResultData from '../Components/ResultData';
import BestDay from '../Components/BestDay';
import Loader from '../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import CityHeader from '../Components/CityHeader';

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const citySearchParam = searchParams.get("city");
  const [city, setCity] = useState(citySearchParam||"");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [jacketDay, setJacketDay] = useState(null);
  const [umbrellaDay, setUmbrellaDay] = useState(null);
  const memoizedCallback = useCallback(
      (city)=>_.debounce((city:string) => {
          searchData(city);
      }, 1000)(city),
      [],
  );
  const searchData = async (city:string) => {
      setLoading(true);
      const cityData = await geoCode(city);
      if(!cityData||cityData.length === 0){
        setLoading(false);
        return;
      }
      const {lat, lon} = cityData[0];
      const weatherData = await getWeatherData({lat, lon});
      const formattedData = weatherData.daily.map((data:any)=>{
          const day = moment.unix(data.dt).tz(weatherData.timezone);
          return {
              day:day.format('dddd (DD/MM/yyyy)'),
              temp: _.get(data,"temp.day"),
              main: _.get(data,"weather[0].main"),
              rain: _.get(data,"rain")
          }
      }).splice(0,5);
      if(!formattedData||formattedData.length===0){
        setJacketDay(null);
        setUmbrellaDay(null);
        setResults([]);
        setLoading(false);
        return;
      }
      const bestDayForUmbrella = formattedData
      .filter((d:any)=>d.main==="Rain")
      .reduce((prev:any, curr:any)=> {
        if(!prev){
            return curr;
        }
        return prev.rain > curr.rain ? prev : curr;
      }, null);

      const bestDayForJacket = formattedData
      .filter((d:any)=>d.main!=="Rain")
      .reduce((prev:any, curr:any)=> {
        if(!prev){
            return curr;
        }
        return prev.temp < curr.temp ? prev : curr;
      }, null);

      setJacketDay(bestDayForJacket);
      setUmbrellaDay(bestDayForUmbrella);
      setResults(formattedData);
      setLoading(false);
  }
  useEffect(()=>{
      if(city){
          memoizedCallback(city);
      }else{
          setJacketDay(null);
          setUmbrellaDay(null);
          setResults([]);
      }
      setSearchParams({city:city});
  },[city, memoizedCallback, setSearchParams]);
  
  return (<>
          <div className="flex-center">
            <TextField
              value={city}
              onChange={e=>setCity(e.target.value)}
              label="Enter City Here"
              variant="standard" />
          </div>
          <Loader loading={loading} />
          <CityHeader city={city}/>
          <BestDay jacketDay={_.get(jacketDay,"day",null)} umbrellaDay={_.get(umbrellaDay,"day",null)} />
          {
              _.get(results,"length",0)>0?
              <Grid container spacing={2}>
                  {results.map((r:any)=><Grid key={r.day} item xs={4}>
                      <ResultData {...r}/>
                  </Grid>)}
              </Grid>:<div className="flex-center no-results"><b>No results Found</b></div>
          }
      </>
  );
}

export default Main;