import React, {useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Redux
import { RootState } from "../../redux/root-reducer";
import { get_movie, get_movie_credit } from '../../redux/movies/movies.actions';
import { get_tv } from '../../redux/series/series.actions';

// Import Styles
import "../../styles/ShortCard.scss";

// Import Utils
import { getYearFromDate, itemInMyList } from '../../utils/function';
import { GET_MOVIE, GET_MOVIE_CREDIT, GET_TV } from '../../utils/query';

function ShortCard({ data, mediaType, inMyList }) {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const appLang = useSelector((state: RootState) => state.utils.language);
    const p = useSelector((state: RootState) => state.profile.profile);

    const [getMovie, resultGetMovie] = useLazyQuery(GET_MOVIE);
    const [getMovieCredit, resultGetMovieCredit] = useLazyQuery(GET_MOVIE_CREDIT);
    const [getTv, resultGetTv] = useLazyQuery(GET_TV);

    const handleClick = (item) => {
        if(item.media_type === "movie") {
            getMovie({variables: {getMovieId: item.id, language: appLang.iso}})
            getMovieCredit({variables: {getCreditsId: item.id, language: appLang.iso}})
        } else if(item.media_type === "tv") {
            getTv({variables: {getSerieId: item.id, language: appLang.iso, appendToResponse: "credits"}})
        } else {
            // error
        }
        console.log(p.profile.my_list)
        console.log(item)
        inMyList(itemInMyList(p.profile.my_list, item))
        setRefresh(!refresh);
    };

    useEffect(() => {
        if(resultGetMovie.data?.getMovie) {
            dispatch(get_movie(resultGetMovie.data))
        }
        if(resultGetMovieCredit.data?.getCredits) {
            dispatch(get_movie_credit(resultGetMovieCredit.data))
        }
        if(resultGetTv.data?.getSerie) {
            dispatch(get_tv(resultGetTv.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultGetMovie.data, resultGetMovie.data?.getMovie, resultGetMovieCredit.data, resultGetMovieCredit.data?.getCredits, resultGetTv.data, resultGetTv.data?.getSerie, dispatch, refresh])

    if(mediaType === "movie") {
        return (
            <div className="short-card" onClick={() => handleClick(data)}>
            <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt={data.title} />
            <h3>{data.title}</h3>
            <p className="year">{getYearFromDate(data.release_date)}</p>
            <p className="overview">{data.overview.substring(0, 50)}...</p>
            </div>
        );
    } else if (mediaType === "tv") {
        return (
            <div className="short-card">
            <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt={data.name} />
            <h3>{data.name}</h3>
            <p className="year">{getYearFromDate(data.first_air_date)}</p>
            <p className="overview">{data.overview.substring(0, 50)}...</p>
            </div>
        );
    } else {
        return null
    }

}

export default ShortCard;