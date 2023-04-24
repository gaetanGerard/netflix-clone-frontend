/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery, useQuery } from "@apollo/client";

// Import Styles
import '../../styles/home.scss';

// Import utils
import {
    DISCOVERS,
    GET_GENRES,
    GET_SIMILAR_MOVIE,
    GET_SIMILAR_TV,
    TRENDING_MOVIE,
    TRENDING_TV,
    UPCOMING_MOVIES,
    TOP_RATED_TV,
    TOP_RATED_MOVIES } from '../../utils/query';
import { itemInMyList } from '../../utils/function';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage, setGenres, resetShowModal } from '../../redux/utils/utils.actions';
import { discover_movies, get_similar_movies, get_trending_movies, get_upcoming_movies, get_top_rated_movies } from '../../redux/movies/movies.actions';
import { discover_series, get_similar_tv, get_trending_tv, get_top_rated_tv } from '../../redux/series/series.actions';
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';
import Slider from '../ui/Slider';
import Modal from '../ui/Modal';

// Import Data
import footerData from '../../data/footer.json';

const Home: FC = (): JSX.Element => {
    document.title = "Home - Netflix" //! to update when add language json
    const location: any = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = location.state;
    const p = useSelector((state: RootState) => state.profile.profile);
    const discoveredMovies = useSelector((state: RootState) => state.movies.discoverMovies);
    const discoveredSeries = useSelector((state: RootState) => state.series.discoverSeries);
    const options = useSelector((state: RootState) => state.utils.languageOptions);
    const appLang = useSelector((state: RootState) => state.utils.language);
    const movieGenres = useSelector((state: RootState) => state.utils.movieGenres);
    const tvGenres = useSelector((state: RootState) => state.utils.tvGenres);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const tv = useSelector((state: RootState) => state.series.series);
    const mediaType = useSelector((state: RootState) => state.utils.mediaType);
    const showModal = useSelector((state: RootState) => state.utils.showModal);
    const similarMovies = useSelector((state: RootState) => state.movies.moreLikeThisMovie);
    const similarTv = useSelector((state: RootState) => state.series.moreLikeThisTv);
    const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);
    const trendingTv = useSelector((state: RootState) => state.series.trendingTv);
    const upcomingMovies = useSelector((state: RootState) => state.movies.upcomingMovies);
    const topRatedTv = useSelector((state: RootState) => state.series.topRatedTv);
    const topRatedMovies = useSelector((state: RootState) => state.movies.topRatedMovies);
    const language = p ? p.profile.language : appLang;
    const [myList, setMyList] = useState(null)
    const [content, setContent] = useState(null)
    const [isInMyList, setIsInMyList] = useState(false)

    const [discoverMovies, resultDiscoverMovies] = useLazyQuery (DISCOVERS);
    const [discoverSeries, resultDiscoverSeries] = useLazyQuery (DISCOVERS);
    const [getMovieGenres, resultMovieGetGenres] = useLazyQuery (GET_GENRES);
    const [getSeriesGenres, resultSeriesGetGenres] = useLazyQuery (GET_GENRES);

    const getSimilarMovie = useQuery(GET_SIMILAR_MOVIE, {
        variables: {
          whatToTarget: "similar",
          getUpcomTopRatedPopuNowPlayingId: "76600",
          language: p ? p.profile.language : null,
          page: "1"
          },
          skip: mediaType === "tv"
      });

    const getSimilarTv = useQuery(GET_SIMILAR_TV, {
        variables: {
          whatToTarget: "similar",
          getUpcomTopRatedPopuNowPlayingTvId: "82856",
          language: p ? p.profile.language : null,
          page: "1"
          },
          skip: mediaType === "movie"
    });

    const getTrendingMovies = useQuery(TRENDING_MOVIE, {
        variables: {
          mediaType: "movie",
          timeWindow: "week",
          language: p ? p.profile.language : null,
          page: "1"
          },
          skip: mediaType === "tv"
    });

    const getTrendingTv = useQuery(TRENDING_TV, {
        variables: {
          mediaType: "tv",
          timeWindow: "week",
          language: p ? p.profile.language : null,
          page: "1"
          },
          skip: mediaType === "movie"
    });

    const getUpcomingMovies = useQuery(UPCOMING_MOVIES, {
        variables: {
            whatToTarget: "upcoming",
            language: p ? p.profile.language : null,
            page: "1"
          },
          skip: mediaType === "tv"
    });

    const getTopRatedTv = useQuery(TOP_RATED_TV, {
        variables: {
            whatToTarget: "top_rated",
            language: p ? p.profile.language : null,
            page: "1"
          },
          skip: mediaType === "movie"
    });

    const getTopRatedMovies = useQuery(TOP_RATED_MOVIES, {
        variables: {
            whatToTarget: "top_rated",
            language: p ? p.profile.language : null,
            page: "1"
          },
          skip: mediaType === "tv"
    });

    const changeLanguage = (e: any) => {
        dispatch(setApplicationLanguage(e.target.value))
    }

    if(profile) {
        if(profile.profile) {
            dispatch(selectProfile(profile));
        } else if (!profile.profile) {
            navigate("/profiles/browse");
        }
    } else if(profile === null && p === null) {
        navigate("/profiles/browse");
    }

    if(p === null && localStorage.getItem('profileSave')) {
        dispatch(selectProfile(JSON.parse(localStorage.getItem('profileSave') || '{}')));
    } else if (p === null && localStorage.getItem('profileSave') === '{}') {
        navigate("/profiles/browse");
    }

    if(p !== null) {
        if (Object.entries(p).length > 0) {
            localStorage.setItem('profileSave', JSON.stringify(p));
        } else {
            navigate("/profiles/browse");
        }
    }

    useEffect(() => {
        discoverMovies({ variables: { media: "movie", language: language, sortBy: "popularity.desc", primaryReleaseDateGte: "2018" } });
        discoverSeries({ variables: { media: "tv", language: language, sortBy: "popularity.desc", primaryReleaseDateGte: "2018" } });
        getMovieGenres({ variables: { media: "movie", language: language } });
        getSeriesGenres({ variables: { media: "tv", language: language } });

        if(resultMovieGetGenres.data) dispatch(setGenres("movie", resultMovieGetGenres.data.getGenres.genres))
        if(resultSeriesGetGenres.data) dispatch(setGenres("tv", resultSeriesGetGenres.data.getGenres.genres))
        if(resultDiscoverMovies.data) dispatch(discover_movies(resultDiscoverMovies.data))
        if(resultDiscoverSeries.data) dispatch(discover_series(resultDiscoverSeries.data))

    }, [resultDiscoverMovies.data, resultDiscoverSeries.data, resultMovieGetGenres.data, resultSeriesGetGenres.data, language, p, showModal])

    useEffect(() => {
        if(discoveredMovies && discoveredSeries) {
            const combinedList = discoveredMovies.results.concat(discoveredSeries.results);
            setMyList(combinedList)
        };
    }, [discoveredMovies, discoveredSeries, showModal])

    useEffect(() => {
        if(mediaType === "movie") {
            setContent(movie)
        } else if (mediaType === "tv") {
            setContent(tv)
        }
    }, [mediaType])

    useEffect(() => {
        if(content) {
            setIsInMyList(itemInMyList(p.profile.my_list, content))
        }
    }, [content])

    useEffect(() => {
        if(getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying) {
          dispatch(get_similar_movies(getSimilarMovie.data))
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSimilarMovie.data, getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying, showModal])

    useEffect(() => {
        if(getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV) {
          dispatch(get_similar_tv(getSimilarTv.data));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSimilarTv.data, getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV, dispatch])

    useEffect(() => {
        if(getTrendingMovies.data?.getTrending) {
            dispatch(get_trending_movies(getTrendingMovies.data))
        }
    }, [getTrendingMovies.data, getTrendingMovies.data?.getTrending, showModal])

    useEffect(() => {
        if(getTrendingTv.data?.getTrending) {
            dispatch(get_trending_tv(getTrendingTv.data))
        }
    }, [getTrendingTv.data, getTrendingTv.data?.getTrending, showModal])

    useEffect(() => {
        if(getUpcomingMovies.data?.getUpcomTopRatedPopuNowPlaying) {
            dispatch(get_upcoming_movies(getUpcomingMovies.data))
        }
    }, [getUpcomingMovies.data, getUpcomingMovies.data?.getUpcomTopRatedPopuNowPlaying, showModal])

    useEffect(() => {
        if(getTopRatedTv.data?.getUpcomTopRatedPopuNowPlayingTV) {
            dispatch(get_top_rated_tv(getTopRatedTv.data))
        }
    }, [getTopRatedTv.data, getTopRatedTv.data?.getUpcomTopRatedPopuNowPlayingTV, showModal])

    useEffect(() => {
        if(getTopRatedMovies.data?.getUpcomTopRatedPopuNowPlaying) {
            dispatch(get_top_rated_movies(getTopRatedMovies.data))
        }
    }, [getTopRatedMovies.data, getTopRatedMovies.data?.getUpcomTopRatedPopuNowPlaying, showModal])


    if(p && myList) {
        return (
            <div className="home-container">
                <Header />
                {showModal && <Modal onClose={() => dispatch(resetShowModal())} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={isInMyList} />}
                <FeaturedListItem myList={p.profile.my_list.length > 0 ? p.profile.my_list : myList} />
                <Slider items={p.profile.my_list} sliderTitle="Ma Liste" position={1} />
                {discoveredMovies ? (<Slider items={discoveredMovies.results} sliderTitle="Ce que regardent les abonnés qui partagent vos goûts" position={2} />) : (<div>Loading...</div>)}
                {discoveredSeries ? (<Slider items={discoveredSeries.results} sliderTitle="Séries à regarder sans modération" position={3} />) : (<div>Loading...</div>)}
                {trendingMovies ? (<Slider items={trendingMovies.results} sliderTitle="Vos films cet semaine" position={4} />) : (<div>Loading...</div>)}
                {similarMovies ? (<Slider items={similarMovies.results} sliderTitle="Parce que vous avez regarder Avatar : La voie de l'eau" position={5} />) : (<div>Loading...</div>)}
                {trendingTv ? (<Slider items={trendingTv.results} sliderTitle="Vos séries cet semaine" position={6} />) : (<div>Loading...</div>)}
                {similarTv ? (<Slider items={similarTv.results} sliderTitle="Parce que vous avez The Mandalorian" position={7} />) : (<div>Loading...</div>)}
                {upcomingMovies ? (<Slider items={upcomingMovies.results} sliderTitle="Prochains films à sortir" position={8} />) : (<div>Loading...</div>)}
                {topRatedTv ? (<Slider items={topRatedTv.results} sliderTitle="Top des séries" position={9} />) : (<div>Loading...</div>)}
                {topRatedMovies ? (<Slider items={topRatedMovies.results} sliderTitle="Top des Films" position={10} />) : (<div>Loading...</div>)}
                <Footer data={footerData[appLang.iso]} options={options} language={appLang.iso} changeLanguage={changeLanguage} />
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default Home
