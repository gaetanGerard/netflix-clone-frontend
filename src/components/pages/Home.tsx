/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from "@apollo/client";

// Import Styles
import '../../styles/home.scss';

// Import utils
import { DISCOVERS, GET_GENRES } from '../../utils/query';
import { newListUtility } from '../../utils/function';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage, setGenres } from '../../redux/utils/utils.actions';
import { discover_movies } from '../../redux/movies/movies.actions';
import { discover_series } from '../../redux/series/series.actions';
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';

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
    const language = p ? p.profile.language : appLang;
    const [myList, setMyList] = useState(null)

    const [discoverMovies, resultDiscoverMovies] = useLazyQuery (DISCOVERS);
    const [discoverSeries, resultDiscoverSeries] = useLazyQuery (DISCOVERS);
    const [getMovieGenres, resultMovieGetGenres] = useLazyQuery (GET_GENRES);
    const [getSeriesGenres, resultSeriesGetGenres] = useLazyQuery (GET_GENRES);

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

    }, [resultDiscoverMovies.data, resultDiscoverSeries.data, resultMovieGetGenres.data, resultSeriesGetGenres.data, language])

    useEffect(() => {
        if(discoveredMovies && discoveredSeries) setMyList(newListUtility(p, discoveredMovies.results, discoveredSeries.results));
    }, [discoveredMovies, discoveredSeries])

    // console.log(discoveredMovies)
    // console.log(discoveredSeries);
    // console.log(p.profile.my_list)

    /*
    *
    * How is divide Home
    *
    * 1) the header is fixed and follow the user until the bottom of the page (transparent on top) (reuse component)
    * 2) the first part of the page is a featured movie or series (lets try to use a top rated movies or series ? or the latest added on TMDB
    *    BUT latest movies or series is sometimes not really interesting)
    * 3) after the page is composed of section each one feature item from a category (all category are shape the same way a title and a list of items
    *    so make a reusable component for each category)
    *       - My List (let start with a list of movies/series add manually before add the logic for the user to do it itself)
    *       - Popular on Netflix (let use popular movies and series)
    *       - Trending Now (use the same from TMDB)
    *       - New Releases (use the same from TMDB)
    *       - Hollywood Movies (to think later as i have no idea for the moment)
    *       - Only on Netflix (use movies/series produce by netflix)
    *       - Adult Animation (use cartoon with the adult tag)
    *       - European Documenary (use doc documentary)
    *       - Anime (use Japanese Cartoon if no anime category exist on TMDB)
    *       - TV Comedies (use tv comedies from TMDB)
    *       - Top 10 in Belgium Today (let use the top 10 movies/series aggregate the list and sort by top to less and use the 10 first)
    *       - Exciting US TV Action & Adventure (use the TV Action & Adventure category from TMDB and keep the TV produce in US)
    *       - Documentaries (use documentaries from TMDB)
    *       - Exciting TV Programs (what define an exciting program for Netflix?)
    *       - Children & Family TV (cartoon & live action TV with no PG)
    *       - TV Sci-FI & Fantasy (use from TMDB)
    *       - Gems for you (that is base on the user profile ever watch content so lets look if TMDB have a solution)
    *       - Period Pieces (history TV)
    *       - Children & Family Movies (use TMDB)
    *       - TV Dramas (use TV Dramas from TMDB)
    *       - History Documentary (use TMDB)
    *       - TV Sci-Fi & Horrors (use TMDB)
    *       - Retro TV (use TMDB)
    *       - TV Action & Adventure (use TMDB)
    *       - Top Picks for user (define that?)
    *       - Food & Travel TV (use TV with the correpsonding cattegory)
    *       - Family Watch Together TV (use TMDB)
    *       - Comedies (use TMDB)
    *       - Workplace TV Shows (use TMDB)
    *       - Futuristic Sci-Fi (use TMDB)
    *       - Stand-Up Comedy (use TMDB)
    *       - International TV Shows (use TMDB)
    *       - US TV Comedies (use TMDB)
    *       - Exciting Movies
    *       - Kids' TV
    *       - US TV Shows
    *       - Exciting TV Shows
    *       - Action TV
    *       - Food For Hungry Brain
    * 4) its the footer reuse the component for this part
    */

    if(p && myList) {
        return (
            <div className="home-container">
                <Header />
                <FeaturedListItem myList={p.profile.my_list.length > 0 ? p.profile.my_list : myList} />
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
