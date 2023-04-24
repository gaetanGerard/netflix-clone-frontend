import React, {useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Redux
import { RootState } from "../../redux/root-reducer";
import { get_movie, get_movie_credit } from '../../redux/movies/movies.actions';
import { get_tv } from '../../redux/series/series.actions';
import { setMediaType, showModal } from '../../redux/utils/utils.actions';

// Import Custom Components
import Modal from "../ui/Modal";

// Import utils
import { GET_MOVIE, GET_MOVIE_CREDIT, GET_TV } from '../../utils/query';
import { convertMinutesToHours } from '../../utils/function';

// Import Icon Components
import Add from "../ui/icons/Add";
import Play from "../ui/icons/Play";
import Check from "../ui/icons/Check";
import Like from "../ui/icons/Like";
import DownArrow from "../ui/icons/DownArrow";
import HD from "../ui/icons/HD";

type CardItem = {
    id: string,
    title?: string,
    name?: string,
    backdrop_path?: string,
    poster_path?: string,
    genre_ids: number[],
    media_type?: string,
    overview?: string,
    vote_average?: number
    number_of_seasons?: number,
    number_of_episodes?: number
    runtime?: number
}

type Props = {
    item: CardItem
    itemID: number
    isInMyList?: boolean
}

const ItemCard = ({item, itemID, isInMyList}: Props) => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const movieGenres = useSelector((state: RootState) => state.utils.movieGenres);
    const tvGenres = useSelector((state: RootState) => state.utils.tvGenres);
    const appLang = useSelector((state: RootState) => state.utils.language);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const tv = useSelector((state: RootState) => state.series.series);
    const [lastInRow, setLastInRow] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth - 100);
    const [itemsPerRow, setItemsPerRow] = useState(Math.floor(windowSize / 235));
    const itemSize = 235;

    const [getMovie, resultGetMovie] = useLazyQuery(GET_MOVIE);
    const [getMovieCredit, resultGetMovieCredit] = useLazyQuery(GET_MOVIE_CREDIT);
    const [getTv, resultGetTv] = useLazyQuery(GET_TV);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth - 100)
            setItemsPerRow(Math.floor(windowSize / itemSize))
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [windowSize, itemsPerRow])

    useEffect(() => {
        setLastInRow((itemID+1) % itemsPerRow === 0 ? true : false)
    }, [itemID, itemsPerRow])

    const getGenreName = (genreID: string) => {
        const genre = movieGenres.find(genre => genre.id === genreID);
        if(genre === undefined) {
            const genre = tvGenres.find(genre => genre.id === genreID);
            if(genre === undefined) return null;
            return genre.name;
        }
        return genre.name;
    }

    const handleClick = (item) => {
        if(item.media_type === "movie") {
            getMovie({variables: {getMovieId: item.id, language: appLang.iso}})
            getMovieCredit({variables: {getCreditsId: item.id, language: appLang.iso}})
            dispatch(setMediaType("movie"))
        } else if(item.media_type === "tv") {
            getTv({variables: {getSerieId: item.id, language: appLang.iso, appendToResponse: "credits"}})
            dispatch(setMediaType("tv"))
        } else {
            // error
        }
        setRefresh(!refresh);
        dispatch(showModal())
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


  return (
    <Fragment>
        {/* showModal && <Modal onClose={() => setShowModal(false)} mediaType={item.media_type} content={item.media_type === "movie" ? movie : tv} movieCredits={item.media_type === "movie" ? movieCast : null} isInMyList /> */}
        <div className={`card ${lastInRow ? "last-card-in-row" : ""}`}>
            <div className="card-inner">
                <div className="img-container">
                    <img src={`https://image.tmdb.org/t/p/original/${item.poster_path !== null ? item.poster_path : item.backdrop_path}`} alt={item.title ? item.title: item.name} />
                    <p>{item.title ? item.title : item.name}</p>
                    <div className="gradient"></div>
                </div>
                <div className="card-body">
                    <div className="btn-container">
                        <div>
                            <button className="btn btn-play">
                                <Play classname="icon" />
                            </button>
                            {isInMyList ? (
                                <button className="btn btn-add-to-my-list" title="Enlever de ma liste">
                                    <Check classname="icon" />
                                </button>
                            ) : (
                                <button className="btn btn-remove-to-my-list" title="Ajouter à ma liste">
                                    <Add classname="icon" />
                                </button>
                            )}
                            <button className="btn btn-like">
                                <Like classname="icon" />
                            </button>
                        </div>
                        <div className="right-icon-container" onClick={() => handleClick(item)}>
                            <button className="btn btn-info">
                                <DownArrow classname="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="detail-container">
                        {item.media_type === "movie" ? (
                            <p className="detail-type">Movie</p>) : (
                            <p className="detail-type">TV Show</p>)
                        }
                        {item.media_type === "tv" ? (
                            item.number_of_seasons !== undefined ? (item.number_of_seasons > 1 ? (<p className="detail">{item.number_of_seasons} Seasons</p>) : (<p className="detail">{item.number_of_episodes} Episodes</p>)) : (null)) : (
                            <p className="detail">{convertMinutesToHours(item.runtime)}</p>
                        )}
                        <HD classname="icon" />
                    </div>
                    <div className="genre-container">
                        {item.genre_ids.map((genre, index) => {
                            return (
                                <p key={index} className="genre">{getGenreName(genre.toString())}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ItemCard