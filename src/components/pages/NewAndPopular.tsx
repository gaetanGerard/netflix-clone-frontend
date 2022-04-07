import React from 'react';

// Import Styles
import '../../styles/home.scss';

// Import Custom Components
import Header from '../ui/Header';

type Props = {}

const NewAndPopular = (props: Props) => {
  return (
    <div className="home-container">
        <Header />
    </div>
  )
}

export default NewAndPopular