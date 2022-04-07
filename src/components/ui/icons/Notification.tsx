/* eslint-disable react/style-prop-object */
import React from 'react';

type Props = {
    classname: string;
};

const Notification = ({ classname }: Props): JSX.Element => {
  return (
        <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={classname}>
            <path d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"/>
        </svg>
  );
}

export default Notification;
