/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname: string;
};

const MRAllPublic = ({ classname }: Props): JSX.Element => {
  return (
    <svg id="maturity-rating-702" viewBox="0 0 100 100" className={classname}>
        <path fill="#fff" d="M1 51a50 50 0 1150 50A50.018 50.018 0 011 51z"></path>
        <path d="M7.4 51A43.6 43.6 0 1151 94.6 43.51 43.51 0 017.4 51zm28.1 27V63.5h6.8V78h10.1V30.8a2.731 2.731 0 00-.8-1.9l-4-4.2a2.439 2.439 0 00-2-.8H32.3a2.438 2.438 0 00-2 .8l-4 4.1a2.973 2.973 0 00-.8 2V78zm0-45h6.8v21.4h-6.8zm42.4 45v-8.5h-9V23.9H58.8V78z"></path>
    </svg>
  );
}

export default MRAllPublic;