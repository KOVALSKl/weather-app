import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { WeatherForecastContext } from '../../components/AppRouter/AppRouter';
import NextDaysFrame from '../../components/Frames/NextDaysFrame/NextDaysFrame';
import TodayForecastFrame from '../../components/Frames/TodayForecastFrame/TodayForecastFrame';
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import { ForecastType } from '../../types';
import './ForecastPage.scss'

type ForecastPageProps = {
    type: ForecastType,
}

function ForecastPage({ type }: ForecastPageProps) {

    const { weather } = useContext(WeatherForecastContext);

    const forecast = useMemo(() => {
        const date = new Date();
        switch (type) {
            case ForecastType.TODAY:
                return {
                    ...weather?.next, list: weather?.next?.list.slice(0, 4)
                }
            case ForecastType.TOMORROW:
                date.setDate(date.getDate() + 1);
                return {
                    ...weather?.next, list: weather?.next?.list.filter((item) => {
                        return (new Date(item.dt * 1000).toLocaleDateString() === date.toLocaleDateString());
                    }).slice(3, 7)
                }
            case ForecastType.NEXTDAYS:
                return {
                    ...weather?.next, list: weather?.next?.list.filter((item) => {
                        let itemDate = new Date(item.dt * 1000);
                        return (itemDate.toLocaleDateString() !== date.toLocaleDateString()
                            && itemDate.getHours() === 9

                        );
                    }).slice(0, 4)
                }
            default:
                return {
                    ...weather?.next,
                }
        }
    }, [weather, type])

    const currentWeather = weather?.current;

    const isLoading = forecast && currentWeather;

    return (
        <div className="page">
            {!isLoading
                ? <LoadSpinner />
                : <div className='content'>
                    <TodayForecastFrame item={currentWeather} />
                    <ul className='days-list'>
                        {forecast?.list?.map((item, index) => (
                            <NextDaysFrame
                                key={item.dt}
                                item={item}
                                type={type} />
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}

export default memo(ForecastPage);