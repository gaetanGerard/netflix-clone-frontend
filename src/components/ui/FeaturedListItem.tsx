import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Redux
import { RootState } from "../../redux/root-reducer";
import { get_movie, get_movie_credit } from '../../redux/movies/movies.actions';
import { get_tv } from '../../redux/series/series.actions';

// Import utils
import { GET_MOVIE, GET_MOVIE_CREDIT, GET_TV } from '../../utils/query';
import { itemInMyList } from '../../utils/function';

// Import Custom Components
import Typography from './Typography';
import Button from './Button';
import Arrow from './icons/Arrow';
import EpisodeList from './icons/EpisodeList';
import Information from './icons/Information';
import MaturityRating from './icons/MaturityRating';
import Modal from './Modal';

// Import Types
import { ListItem } from '../../types/featuredType';

type Props = {
    myList: [ListItem]
}

const FeaturedListItem = ({myList}: Props) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mediaType, setMediaType] = useState<string|null>(null);
    const p = useSelector((state: RootState) => state.profile.profile);
    const movieGenres = useSelector((state: RootState) => state.utils.movieGenres);
    const tvGenres = useSelector((state: RootState) => state.utils.tvGenres);
    const appLang = useSelector((state: RootState) => state.utils.language);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const tv = useSelector((state: RootState) => state.series.series);

    const [getMovie, resultGetMovie] = useLazyQuery(GET_MOVIE);
    const [getMovieCredit, resultGetMovieCredit] = useLazyQuery(GET_MOVIE_CREDIT);
    const [getTv, resultGetTv] = useLazyQuery(GET_TV);

    const [randomItem, setRandomItem] = useState<ListItem|null>(null)
    let newList;

    if (location.pathname === "/tv") {
        newList = myList.filter(item => item.name);
    } else if (location.pathname === "/movies") {
        newList = myList.filter(item => item.title);
    } else {
        newList = myList;
    }

    const item = newList[Math.floor(Math.random()*newList.length)];

    useEffect(() => {
        setRandomItem(item)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onclick = (item) => {
        if(item.title !== undefined && item.title) {
            getMovie({variables: {getMovieId: item.id, language: p.profile.language}})
            getMovieCredit({variables: {getCreditsId: item.id, language: p.profile.language}})
            setMediaType("movie")
        } else if(item.name !== undefined && item.name) {
            getTv({variables: {getSerieId: item.id, language: p.profile.language, appendToResponse: "credits"}})
            setMediaType("tv")
        } else {
            // error
        }
        setRefresh(!refresh);
        setShowModal(true);
    }

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

    if(randomItem && p) {
        return (
            <Fragment>
                {showModal && <Modal onClose={() => setShowModal(false)} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={itemInMyList(p.profile.my_list, randomItem)} />}
                <div className="featured-list-item-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomItem.backdrop_path})`}}>
                    <div className="featured-list-item-info">
                        <Typography HTMLElement="h1" classname="featured-list-item-title">{randomItem.title ? randomItem.title : randomItem.name}</Typography>
                        <Typography HTMLElement="p" classname="featured-list-item-overview">{randomItem.overview}</Typography>
                        <div className="featured-list-item-btn-container">
                            <Link to="TO_DEFINE" className="btn btn-play"><Arrow />{randomItem.name ? "Play Episode" : "Play"}</Link>
                            <Button btnType="button" classname="btn btn-dialog" onclick={() => onclick(randomItem)} name="openInfo" ><Information /> More Info</Button>
                        </div>
                    </div>
                    <div className="featured-list-item-maturity-rating">
                        <MaturityRating classname="maturity-rating-icon" />
                    </div>
                    <div className="gradient"></div>
                </div>
            </Fragment>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}


export default FeaturedListItem