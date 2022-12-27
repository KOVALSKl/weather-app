import { useEffect, useState } from 'react';
import { beautifyTime, CurrentWeather, getDayName } from '../../../types';
import './TodayForecastFrame.scss'

type TodayForecastFrameProps = {
    item: CurrentWeather | Omit<CurrentWeather, 'coord' | 'sys' | 'name'>;
}


function TodayForecastFrame({ item }: TodayForecastFrameProps) {

    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className='today-forecast-frame'>
            <div className='header'>
                <span className='header__span-day-name'>{getDayName(new Date(item.dt * 1000), true)}</span>
                <span className='header__span-time'>{beautifyTime(date)}</span>
            </div>
            <div className='main-content'>
                <div className='temperature-forecast-icon-section'>
                    <span className='temperature'>{Math.round(item.main.temp)}&deg;</span>
                    <img
                        src={require(`../../../images/weather-icons/${item.weather[0].icon}.svg`)}
                        className='forecast-icon'
                    />
                </div>
                <div className='main-forecast-info'>
                    <span className='main-forecast-info__item'>Real Feel {Math.round(item.main.feels_like)}&deg;</span>
                    <span className='main-forecast-info__item'>Wind: N-E, {Math.round(item.wind.speed)} km/h</span>
                    <div className='pressure-humidity-section'>
                        <span className='main-forecast-info__item'>Pressure: {item.main.pressure}MB</span>
                        <span className='main-forecast-info__item'>Humidity: {item.main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodayForecastFrame;