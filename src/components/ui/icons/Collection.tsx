/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname: string;
};

const Collection = ({ classname }: Props): JSX.Element => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={classname} data-name="Collection">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 3C0.895431 3 0 3.89543 0 5V19C0 20.1046 0.895431 21 2 21H22C23.1046 21 24 20.1046 24 19V5C24 3.89543 23.1046 3 22 3H2ZM2 5H22V19H2V5ZM5 7V17H7V7H5ZM9 17V7H11V17H9ZM13.0715 7.37139L17.0715 17.3714L18.9285 16.6286L14.9285 6.62861L13.0715 7.37139Z" fill="currentColor"></path>
    </svg>
  );
}

export default Collection;
