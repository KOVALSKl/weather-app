import { ReactElement, ReactNode } from 'react';
import './CircleButton.scss'

type CircleButtonProps = {
    children: ReactNode | ReactElement,
    onClick?: () => void;
    classNames?: string[],
}

function CircleButton({ children, onClick, classNames = [] }: CircleButtonProps) {
    return (
        <button
            className={["circle-button", ...classNames].join(' ')}
            onClick={() => onClick ? onClick() : null}
        >
            {children}
        </button>
    );
}

export default CircleButton;