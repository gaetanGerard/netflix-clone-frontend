/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery, useQuery } from "@apollo/client";

// Import Styles
import '../../styles/home.scss';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage, resetShowModal } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";
import { discover_movies, get_similar_movies, get_trending_movies, get_upcoming_movies, get_top_rated_movies } from '../../redux/movies/movies.actions';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';
import Slider from '../ui/Slider';
import Modal from '../ui/Modal';

// Import utils
import {
    DISCOVERS,
    GET_SIMILAR_MOVIE,
    TRENDING_MOVIE,
    UPCOMING_MOVIES,
    TOP_RATED_MOVIES } from '../../utils/query';
import { itemInMyList } from '../../utils/function';

// Import Data
import footerData from '../../data/footer.json';

type Props = {}

const Movies = (props: Props) => {
    document.title = "Movies - Netflix" //! to update when add language json
    const location: any = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = location.state;
    const p = useSelector((state: RootState) => state.profile.profile);
    const lang = useSelector((state: RootState) => state.utils.language);
    const language = p ? p.profile.language : lang;
    const options = useSelector((state: RootState) => state.utils.languageOptions);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const mediaType = useSelector((state: RootState) => state.utils.mediaType);
    const showModal = useSelector((state: RootState) => state.utils.showModal);
    const similarMovies = useSelector((state: RootState) => state.movies.moreLikeThisMovie);
    const trendingMovies = useSelector((state: RootState) => state.movies.trendingMovies);
    const upcomingMovies = useSelector((state: RootState) => state.movies.upcomingMovies);
    const topRatedMovies = useSelector((state: RootState) => state.movies.topRatedMovies);
    const tv = useSelector((state: RootState) => state.series.series);
    const [content, setContent] = useState(null)
    const [isInMyList, setIsInMyList] = useState(false);
    const [discoverVariables, setDiscoverVariables] = useState({
        default: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en" },
        comedy: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "35" },
        documentary: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "99" },
        scienceFiction: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "878" },
        fantasy: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "14" },
        action: { media: "movie", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "12" },
    })
    const [discoverResults, setDiscoverResults] = useState<any>({
        default: { data: null, loading: true, error: null },
        comedy: { data: null, loading: true, error: null },
        documentary: { data: null, loading: true, error: null },
        scienceFiction: { data: null, loading: true, error: null },
        fantasy: { data: null, loading: true, error: null },
        action: { data: null, loading: true, error: null }
    })

    const fetchDiscoverMovies = (key) => {
        const variables = discoverVariables[key];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result: any = useQuery(DISCOVERS, { variables })

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if(result.data) {
                setDiscoverResults((prevResults) => ({
                    ...prevResults,
                    [key]: { data: result.data.getDiscover, loading: result.loading, error: result.error },
                }));
            }
        }, [key, result.data, result.error, result.loading])

        return result;
    }

    const {data: defaultData, refetch: defaultRefetch} = fetchDiscoverMovies('default');
    const { data: comedyResult, refetch: comedyRefetch } = fetchDiscoverMovies('comedy');
    const { data: documentaryResult, refetch: documentaryRefetch } = fetchDiscoverMovies('documentary');
    const { data: scienceFictionResult, refetch: scienceFictionRefetch } = fetchDiscoverMovies('scienceFiction');
    const { data: fantasyResult, refetch: fantasyRefetch } = fetchDiscoverMovies('fantasy');
    const { data: actionResult, refetch: actionRefetch } = fetchDiscoverMovies('action');

    const getSimilarMovie = useQuery(GET_SIMILAR_MOVIE, {
    variables: {
      whatToTarget: "similar",
      getUpcomTopRatedPopuNowPlayingId: "76600",
      language: p ? p.profile.language : null,
      page: "1"
      },
      skip: mediaType === "tv"
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

    const getUpcomingMovies = useQuery(UPCOMING_MOVIES, {
        variables: {
            whatToTarget: "upcoming",
            language: p ? p.profile.language : null,
            page: "1"
        },
        skip: mediaType === "tv"
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
        if(content) {
            setIsInMyList(itemInMyList(p.profile.my_list, content))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content])

    useEffect(() => {
        if(getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying) {
          dispatch(get_similar_movies(getSimilarMovie.data))
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSimilarMovie.data, getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying, showModal])

    useEffect(() => {
        if(getTrendingMovies.data?.getTrending) {
            dispatch(get_trending_movies(getTrendingMovies.data))
        }
    }, [dispatch, getTrendingMovies.data, getTrendingMovies.data?.getTrending, showModal])

    useEffect(() => {
        if(getUpcomingMovies.data?.getUpcomTopRatedPopuNowPlaying) {
            dispatch(get_upcoming_movies(getUpcomingMovies.data))
        }
    }, [dispatch, getUpcomingMovies.data, getUpcomingMovies.data?.getUpcomTopRatedPopuNowPlaying, showModal])

    useEffect(() => {
        if(getTopRatedMovies.data?.getUpcomTopRatedPopuNowPlaying) {
            dispatch(get_top_rated_movies(getTopRatedMovies.data))
        }
    }, [dispatch, getTopRatedMovies.data, getTopRatedMovies.data?.getUpcomTopRatedPopuNowPlaying, showModal])


  if(p) {
    return (
        <div className="home-container">
            <Header />
            {showModal && <Modal onClose={() => dispatch(resetShowModal())} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={isInMyList} />}
            <FeaturedListItem myList={p.profile.my_list.length > 0 ? p.profile.my_list : movie} />
            <Slider items={p.profile.my_list} sliderTitle="Ma Liste" position={1} />
            {discoverResults.default.data ? (<Slider items={discoverResults.default.data.results} sliderTitle="Prisés des abonnés qui partagent vos goûts" position={2} />) : (<div>Loading...</div>)}
            {discoverResults.comedy.data ? (<Slider items={discoverResults.comedy.data.results} sliderTitle="Comédies palpitantes" position={3} />) : (<div>Loading...</div>)}
            {trendingMovies ? (<Slider items={trendingMovies.results} sliderTitle="Vos films cet semaine" position={4} />) : (<div>Loading...</div>)}
            {discoverResults.documentary.data ? (<Slider items={discoverResults.documentary.data.results} sliderTitle="Docus société et culture" position={5} />) : (<div>Loading...</div>)}
            {similarMovies ? (<Slider items={similarMovies.results} sliderTitle="Parce que vous avez regarder Avatar : La voie de l'eau" position={6} />) : (<div>Loading...</div>)}
            {discoverResults.scienceFiction.data ? (<Slider items={discoverResults.scienceFiction.data.results} sliderTitle="Science-Fiction" position={7} />) : (<div>Loading...</div>)}
            {upcomingMovies ? (<Slider items={upcomingMovies.results} sliderTitle="Prochains films à sortir" position={8} />) : (<div>Loading...</div>)}
            {discoverResults.fantasy.data ? (<Slider items={discoverResults.fantasy.data.results} sliderTitle="Mystères" position={9} />) : (<div>Loading...</div>)}
            {topRatedMovies ? (<Slider items={topRatedMovies.results} sliderTitle="Top des Films" position={10} />) : (<div>Loading...</div>)}
            <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
        </div>
    )
  } else {
      return (
          <div>Loading...</div>
      )
  }
}

export default Movies