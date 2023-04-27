import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery, useQuery } from "@apollo/client";

// Import Styles
import '../../styles/home.scss';

// Import redux
import { selectProfile } from '../../redux/profile/profile.action';
import { setApplicationLanguage, resetShowModal } from '../../redux/utils/utils.actions';
import { discover_series, get_similar_tv, get_trending_tv, get_top_rated_tv } from '../../redux/series/series.actions';
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import FeaturedListItem from '../ui/FeaturedListItem';
import Slider from '../ui/Slider';
import Modal from '../ui/Modal';

// Import utils
import {
    DISCOVERS,
    GET_SIMILAR_TV,
    TRENDING_TV,
    TOP_RATED_TV } from '../../utils/query';
import { itemInMyList } from '../../utils/function';

// Import Data
import footerData from '../../data/footer.json';
import pageLangData from '../../data/seriesMoviesMyList.json';

type Props = {}

const Tvs = (props: Props) => {
    const location: any = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = location.state;
    const p = useSelector((state: RootState) => state.profile.profile);
    const lang = useSelector((state: RootState) => state.utils.language);
    const language = p ? p.profile.language : lang;
    const options = useSelector((state: RootState) => state.utils.languageOptions);
    const tv = useSelector((state: RootState) => state.series.series);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const mediaType = useSelector((state: RootState) => state.utils.mediaType);
    const showModal = useSelector((state: RootState) => state.utils.showModal);
    const similarTv = useSelector((state: RootState) => state.series.moreLikeThisTv);
    const trendingTv = useSelector((state: RootState) => state.series.trendingTv);
    const topRatedTv = useSelector((state: RootState) => state.series.topRatedTv);
    const [content, setContent] = useState(null)
    const [isInMyList, setIsInMyList] = useState(false)
    const [langData, setLangData] = useState(pageLangData[language])
    const [discoverVariables, setDiscoverVariables] = useState({
        default: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en" },
        comedy: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "35" },
        documentary: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "99" },
        scienceFiction: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "10765" },
        animation: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "16" },
        action: { media: "tv", language: p ? p.profile.language : "", kid: false, sortBy: "popularity.desc", page: 1, originalLanguage: "en", withGenre: "10759" },
    })
    const [discoverResults, setDiscoverResults] = useState<any>({
        default: { data: null, loading: true, error: null },
        comedy: { data: null, loading: true, error: null },
        documentary: { data: null, loading: true, error: null },
        scienceFiction: { data: null, loading: true, error: null },
        fantasy: { data: null, loading: true, error: null },
        action: { data: null, loading: true, error: null }
    })

    useEffect(() => {
        document.title = langData.series.documentTitle
    }, [langData, language])

    const fetchDiscoverTv = (key) => {
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

    const {data: defaultData, refetch: defaultRefetch} = fetchDiscoverTv('default');
    const { data: comedyResult, refetch: comedyRefetch } = fetchDiscoverTv('comedy');
    const { data: documentaryResult, refetch: documentaryRefetch } = fetchDiscoverTv('documentary');
    const { data: scienceFictionResult, refetch: scienceFictionRefetch } = fetchDiscoverTv('scienceFiction');
    const { data: animationResult, refetch: animationRefetch } = fetchDiscoverTv('animation');
    const { data: actionResult, refetch: actionRefetch } = fetchDiscoverTv('action');

    const getSimilarTv = useQuery(GET_SIMILAR_TV, {
        variables: {
          whatToTarget: "similar",
          getUpcomTopRatedPopuNowPlayingTvId: "82856",
          language: p ? p.profile.language : null,
          page: "1"
          },
          skip: mediaType === "movie"
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

    const getTopRatedTv = useQuery(TOP_RATED_TV, {
        variables: {
            whatToTarget: "top_rated",
            language: p ? p.profile.language : null,
            page: "1"
          },
          skip: mediaType === "movie"
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
        if(getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV) {
          dispatch(get_similar_tv(getSimilarTv.data));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSimilarTv.data, getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV, dispatch])

    useEffect(() => {
        if(getTopRatedTv.data?.getUpcomTopRatedPopuNowPlayingTV) {
            dispatch(get_top_rated_tv(getTopRatedTv.data))
        }
    }, [dispatch, getTopRatedTv.data, getTopRatedTv.data?.getUpcomTopRatedPopuNowPlayingTV, showModal])

    useEffect(() => {
        if(getTrendingTv.data?.getTrending) {
            dispatch(get_trending_tv(getTrendingTv.data))
        }
    }, [dispatch, getTrendingTv.data, getTrendingTv.data?.getTrending, showModal])

  if(p) {
    return (
        <div className="home-container">
            <Header />
            {showModal && <Modal onClose={() => dispatch(resetShowModal())} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={isInMyList} />}
            <FeaturedListItem myList={p.profile.my_list.length > 0 ? p.profile.my_list : tv} />
            <Slider items={p.profile.my_list} sliderTitle={langData.series.sliderTitle[0]} position={1} />
            {discoverResults.default.data ? (<Slider items={discoverResults.default.data.results} sliderTitle={langData.series.sliderTitle[1]} position={2} />) : (<div>Loading...</div>)}
            {discoverResults.comedy.data ? (<Slider items={discoverResults.comedy.data.results} sliderTitle={langData.series.sliderTitle[2]} position={3} />) : (<div>Loading...</div>)}
            {trendingTv ? (<Slider items={trendingTv.results} sliderTitle={langData.series.sliderTitle[3]} position={4} />) : (<div>Loading...</div>)}
            {discoverResults.documentary.data ? (<Slider items={discoverResults.documentary.data.results} sliderTitle={langData.series.sliderTitle[4]} position={5} />) : (<div>Loading...</div>)}
            {similarTv ? (<Slider items={similarTv.results} sliderTitle={langData.series.sliderTitle[5]} position={6} />) : (<div>Loading...</div>)}
            {discoverResults.scienceFiction.data ? (<Slider items={discoverResults.scienceFiction.data.results} sliderTitle={langData.series.sliderTitle[6]} position={7} />) : (<div>Loading...</div>)}
            {discoverResults.animation ? (<Slider items={discoverResults.animation.data.results} sliderTitle={langData.series.sliderTitle[7]} position={8} />) : (<div>Loading...</div>)}
            {topRatedTv ? (<Slider items={topRatedTv.results} sliderTitle={langData.series.sliderTitle[8]} position={9} />) : (<div>Loading...</div>)}
            {discoverResults.action.data ? (<Slider items={discoverResults.action.data.results} sliderTitle={langData.series.sliderTitle[9]} position={10} />) : (<div>Loading...</div>)}
            <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
        </div>
    )
  } else {
      return (
          <div>Loading...</div>
      )
  }
}

export default Tvs