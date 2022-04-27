import axios from 'axios';

export const configuration = () => {
    const res = axios.get(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)

    return res;
}