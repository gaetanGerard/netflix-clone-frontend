import React from 'react';

// Import Styles
import '../../styles/home.scss';

// Import Custom Components
import Header from '../ui/Header';

type Props = {}

const Tvs = (props: Props) => {
  document.title = "Tv - Netflix" //! to update when add language json
  return (
    <div className="home-container">
        <Header />
    </div>
  )
}

export default Tvs