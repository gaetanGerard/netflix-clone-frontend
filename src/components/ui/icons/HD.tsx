/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname: string;
};

const HD = ({ classname }: Props): JSX.Element => {
  return (
    <svg className={classname} version="1.1" id="Layer_1" viewBox="0 0 321.925 321.925">
        <g transform="translate(0 -562.36)">
            <g>
                <g>
                    <path d="M161.142,611.273c-6.3,0-12.1,4.2-13.6,11l-22,87.1h-68.7l19.9-80.8c2-8.3-4.3-16.7-13.2-17.2c-6.8,0-12.6,4.2-14.2,11
                        l-48.8,195.1c-4.7,18.4,22.6,25.2,27.3,6.8l21.5-87.1h69.3l-20.5,80.3c-4.2,17.8,22.6,24.7,27.3,6.8l48.8-195.7
                        C176.842,620.173,170.542,611.773,161.142,611.273z"/>
                    <path d="M307.942,611.373c-34,0-68.6,0-98,0c-6.3,0-12.1,4.7-13.6,10.5l-4.2,17.3h98.1l-42,167.9h-69.3l33.1-132.7h-28.9
                        l-35.7,143.7c-2.1,8.4,4.2,17.3,13.6,17.3h97.6c6.8,0,12.1-4.7,13.6-11l49.3-195.7
                        C323.642,619.773,316.842,611.373,307.942,611.373z"/>
                </g>
            </g>
        </g>
    </svg>
    );
}

export default HD;