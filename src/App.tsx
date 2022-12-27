import { memo, useContext, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { WeatherForecastContext } from './components/AppRouter/AppRouter';
import { beautifyTime, CurrentWeather, Forecast, UVIndex } from './types';
import { YMaps, Map, Placemark, FullscreenControl } from '@pbe/react-yandex-maps';

import CircleButton from './components/Buttons/CircleButton/CircleButton';
import SearchBar from './components/SearchBar/SearchBar';
import Switch from './components/Switch/Switch';
import Tabs from './components/Tabs/Tabs'
import LoadSpinner from './components/LoadSpinner/LoadSpinner';
import LineChart from './components/LineChart/LineChart';

import './App.scss';

import axios from 'axios';

function App() {

  const { setWeather } = useContext(WeatherForecastContext);

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [forecast, setForecast] = useState<Forecast>();

  const [place, setPlace] = useState<string>('Bebra');

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_WEATHER_LINK}forecast?q=${place}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(({ data }: { data: Forecast }) => {
        if (data.list.length > 0) {
          setForecast(data);
        }
      })
      .catch((error: Error) => console.log(error));

    axios.get(`${process.env.REACT_APP_WEATHER_LINK}weather?q=${place}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(({ data }: { data: CurrentWeather }) => {
        if (data.cod === 200) {
          setCurrentWeather(data);
        }
      })
      .catch((error: Error) => console.log(error));

  }, [place])

  useEffect(() => {
    if (currentWeather && forecast?.list) {
      setWeather({
        current: currentWeather,
        next: forecast
      })
    }
  }, [currentWeather, forecast])

  const [date, setDate] = useState<Date>(new Date());
  const isLoading = !forecast || !currentWeather;
  const weekWindSpeed = forecast?.list.map((item) => item.wind.speed);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className="App">
      <header className='header'>
        <div className='left-corner'>
          <div className='buttons'>
            <CircleButton>
              <img src={require('./images/apps.svg').default} />
            </CircleButton>
            <CircleButton>
              <img src={require('./images/bell.svg').default} />
            </CircleButton>
          </div>
          <span className='city-info'>{forecast?.city.name}, {forecast?.city.country}</span>
        </div>
        <SearchBar setSearch={setPlace} />
        <div className='right-corner'>
          <Switch />
          <img src={require('./images/tony.png')} />
        </div>
      </header>

      <main className='main'>
        <div className='right-side-content'>
          <div className='block-header'>
            <div className='links'>
              <NavLink to='/'>Today</NavLink>
              <NavLink to='/tomorrow'>Tomorrow</NavLink>
              <NavLink to='/nextdays'>Next 5 days</NavLink>
            </div>
            <Tabs />
          </div>
          <Outlet />
          <div className='map-block'>
            <div className='map-block__header'>
              <span className='title'>Global Map</span>
              <CircleButton
                classNames={['view-wide-btn']}
                onClick={() => mapRef.current.container.enterFullscreen()}
              >
                View Wide
                <img src={require('./images/stars.svg').default} />
              </CircleButton>
            </div>
            {
              isLoading
                ? <LoadSpinner />
                :
                <YMaps>
                  <Map instanceRef={mapRef}
                    state={{ center: [forecast.city.coord.lat, forecast.city.coord.lon], zoom: 7 }} >
                    <Placemark
                      geometry={[forecast.city.coord.lat, forecast.city.coord.lon]}
                      properties={{
                        hintContent: `${Math.round(currentWeather?.main.temp)}ºC`,
                        balloonContent: `
                      Temp: ${Math.round(currentWeather?.main.temp)}ºC<br/>
                      Real feel:${Math.round(currentWeather?.main.feels_like)}ºC<br/>
                      ${currentWeather?.weather[0].description}`,
                      }}
                      modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                      options={{
                        hasHint: true,
                        openHintOnHover: true,
                        hasBalloon: true,
                      }}
                    />
                    <FullscreenControl />
                  </Map>
                </YMaps>
            }
          </div>
        </div>
        <div className='left-side-content'>
          {
            isLoading
              ? <LoadSpinner />
              : <div className='charts'>
                <div className='wind chart-frame'>
                  <div className='title'>Wind status</div>
                  <LineChart dataset={weekWindSpeed} borderColor='#31DAFF' backgroundColor='#31DAFF' />
                  <div className='sub-info'>
                    <div className='value-with-units-section'>
                      <span className='value'>{Math.max(...weekWindSpeed ?? [])}</span>
                      <span className='units'>km/h</span>
                    </div>
                    <span className='current-time'>
                      {beautifyTime(date)}
                    </span>
                  </div>
                </div>
              </div>
          }
        </div>
      </main>

    </div>
  );
}

export default memo(App);
