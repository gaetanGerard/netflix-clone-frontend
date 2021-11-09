import React, { Fragment } from 'react'
import { useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import Redux
import { setApplicationLanguage } from '../../redux/utils/utils.actions';

// Import language data
import data from '../../data/auth.json';

// Import Custom Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Logout from '../auth/Logout';

// Import styles
import '../../styles/auth.scss';

const Auth = () => {
    const lang = useSelector((state) => state.utils.language);
    const options = useSelector((state) => state.utils.languageOptions);
    const dispatch = useDispatch()
    let location = useLocation();

    const changeLanguage = (e) => {
        dispatch(setApplicationLanguage(e.target.value))
    }

    switch (location.pathname) {
        case "/login":
            return (
                <Fragment>
                    <Login language={lang.name} data={data.login} changeLanguage={changeLanguage} options={options} />
                </Fragment>
            )
        case "/register":
            return (
                <Fragment>
                    <Register language={lang.name} data={data.register} changeLanguage={changeLanguage} options={options}  />
                </Fragment>
            )
        case "/logout":
            return (
                <Fragment>
                    <Logout language={lang.name} data={data.logout} changeLanguage={changeLanguage} options={options}  />
                </Fragment>
            )
        default:
            return (
                <Fragment>
                    <p>Error...</p>
                </Fragment>
            );
    }
}

export default Auth
