import React from 'react'

const Logout = ({ language, data, changeLanguage, options }) => {
    document.title = data[language].documentTitle
    return (
        <div>
            Logout
        </div>
    )
}

export default Logout
