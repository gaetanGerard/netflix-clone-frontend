import React from 'react';

// Import Custom Components
import Select from '../ui/Select';

const Login = ({ language, data, changeLanguage, options }) => {
    document.title = data[language].documentTitle

    console.log(data[language])

    return (
        <div>
            Login
            <Select options={options} name="language" selected={language} onchange={(e) => changeLanguage(e)} />
        </div>
    )
}

export default Login
