import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

// Import Redux
import { logout } from '../../redux/auth/auth.actions';

// Import custom Components

const Home = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <p>Protected Home</p>
            <Link to="/logout" onClick={() => dispatch(logout)}>Logout</Link>
        </div>
    )
}

export default Home
