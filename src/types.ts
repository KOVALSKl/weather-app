export type WeatherForecast = {
    current: CurrentWeather | null,
    next: Forecast | null,
}

export type WeatherContextType = {
    weather: WeatherForecast | null,
    setWeather: (forecast: WeatherForecast) => void;
}

export interface WeatherIcon {
    id: number,
    main: string,
    description: string,
    icon: string,
}

export interface CurrentWeather {
    cod: number,
    coord: {
        lon: number,
        lat: number,
    },
    weather: WeatherIcon[],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    wind: {
        speed: number,
        deg: number,
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number,
    }
    timezone: number,
    name: string,
}

export interface Forecast {
    list: Omit<CurrentWeather, 'coord' | 'sys' | 'name'>[]
    city: {
        name: string,
        coord: {
            lon: number,
            lat: number,
        },
        country: string,
        sunrise: number,
        sunset: number,
    }
}

export interface UVIndex {
    current: {
        uv_index: number;
    }
}

export enum ForecastType {
    TODAY,
    TOMORROW,
    NEXTDAYS,
}

export function beautifyTime(time: Date) {
    return time.toLocaleTimeString('en-EN', { hour12: true, hour: '2-digit', minute: '2-digit' })
}

export function getDayName(time: Date, long: boolean = false) {
    return time.toLocaleDateString('en-EN', { weekday: (long) ? 'long' : 'short' })
}