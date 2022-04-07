import React from 'react';

// Import Styles
import '../../styles/home.scss';

// Import Custom Components
import Header from '../ui/Header';

type Props = {}

const Movies = (props: Props) => {
  document.title = "Movies - Netflix" //! to update when add language json
  return (
    <div className="home-container">
        <Header />
    </div>
  )
}

export default Movies