/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname: string;
};

const Avatar = ({ classname }: Props): JSX.Element => {
  return (
    <svg width="32.537px" height="32.537px" className={classname} viewBox="0 -2.93 32.537 32.537" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-481.391 -197.473)">
            <path d="M512.928,224.152a.991.991,0,0,1-.676-.264,21.817,21.817,0,0,0-29.2-.349,1,1,0,1,1-1.322-1.5,23.814,23.814,0,0,1,31.875.377,1,1,0,0,1-.677,1.736Z"/>
            <path d="M498.191,199.473a7.949,7.949,0,1,1-7.949,7.95,7.959,7.959,0,0,1,7.949-7.95m0-2a9.949,9.949,0,1,0,9.95,9.95,9.949,9.949,0,0,0-9.95-9.95Z"/>
        </g>
    </svg>
  );
};

export default Avatar;
