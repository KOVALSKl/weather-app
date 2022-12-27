import { useState } from 'react';
import './Tabs.scss'

type TabsProps = {
    classNames?: string[];
}

function Tabs({ classNames = [] }: TabsProps) {

    const [forecastType, setForecastType] = useState<boolean>(true);

    const getType = (type: boolean) => type ? 'active' : 'non-active';

    return (
        <label className={['tabs', ...classNames].join(' ')}>
            <input type="checkbox" onChange={() => setForecastType(!forecastType)} />
            <span className="slider round"></span>
            <div className='forecast-types'>
                <span
                    className={['forecast-types__type', getType(forecastType)].join(' ')}
                    id='forecast'>
                    Forecast
                </span>
                <span
                    className={['forecast-types__type', getType(!forecastType)].join(' ')}
                    id='air-quality'
                >
                    Air quality
                </span>
            </div>
        </label>
    );
}

export default Tabs;