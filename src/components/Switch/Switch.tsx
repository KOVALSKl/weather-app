import { useState } from 'react';
import './Switch.scss'

type SwitchProps = {
    classNames?: string[];
}

function Switch({ classNames = [] }: SwitchProps) {

    const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

    return (
        <label className={['switch', ...classNames].join(' ')}>
            <input type="checkbox" onChange={() => setIsLightTheme(!isLightTheme)} />
            <span className="slider round"></span>
            <div className={['theme-icons', isLightTheme ? 'light' : 'dark'].join(' ')}>
                <img
                    src={require('../../images/light-theme-sign.svg').default}
                    className='theme-icons__icon'
                    id='light'
                />
                <img src={require('../../images/dark-theme-sign.svg').default}
                    className='theme-icons__icon'
                    id='dark'
                />
            </div>
        </label>
    );
}

export default Switch;