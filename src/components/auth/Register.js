import React from 'react'

const Register = ({ language, data, changeLanguage, options }) => {
    document.title = data[language].documentTitle
    return (
        <div>
            Register
        </div>
    )
}

export default Register
