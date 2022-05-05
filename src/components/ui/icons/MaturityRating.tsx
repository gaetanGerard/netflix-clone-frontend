/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname?: string;
};

const MaturityRating = ({ classname }: Props): JSX.Element => {
  return (
    <svg id="maturity-rating-705" viewBox="0 0 100 100" className={classname}>
        <path fill="#fff" d="M1 51a50 50 0 1150 50A50.018 50.018 0 011 51z"></path>
        <path d="M7.4 51A43.6 43.6 0 1151 94.6 43.447 43.447 0 017.4 51zm32.4 27V24h-7.2a4.216 4.216 0 00-1.9.3l-8.3 2.9v5.3h6.8V78zm37.1 0v-9.5H58.5v-5l17.6-14.2a2.358 2.358 0 00.9-2V30.9a2.973 2.973 0 00-.8-2l-4-4.1a2.438 2.438 0 00-2-.8H54.6a2.438 2.438 0 00-2 .8l-4 4.1a2.973 2.973 0 00-.8 2v9.5h10.8v-7.1h7.8v10.4L48.7 57.8a2.358 2.358 0 00-.9 2V78z"></path>
    </svg>
  );
}

export default MaturityRating;
