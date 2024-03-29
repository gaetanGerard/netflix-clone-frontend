/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";


// Import Custom Components
import SkeletonLoading from "./SkeletonLoading";
import Typography from "./Typography";
import ShortCard from "./ShortCard";

// Import Icons
import Add from "../ui/icons/Add";
import Arrow from "../ui/icons/Arrow";
import Check from "../ui/icons/Check";
import Like from "../ui/icons/Like";
import Collection from "../ui/icons/Collection";
import MRTwelvePlus from "./icons/MRTwelvePlus";
import MRViolence from "./icons/MRViolence";
import MRFear from "./icons/MRFear";
import MRProfanity from "./icons/MRProfanity";
import MRAllPublic from "./icons/MRAllPublic";
import HD from "../ui/icons/HD";
import PlayCircle from "../ui/icons/PlayCircle";
import DownArrow from "../ui/icons/DownArrow";

// Import Utils
import { convertMinutesToHours, getYearFromDate } from '../../utils/function';
import { GET_SEASON, GET_SIMILAR_MOVIE, GET_SIMILAR_TV } from '../../utils/query';

// Import Redux
import { RootState } from "../../redux/root-reducer";
import { reset_movie_store, get_similar_movies } from '../../redux/movies/movies.actions';
import { reset_tv_store, get_season, get_similar_tv } from '../../redux/series/series.actions';
import { resetMediaType } from '../../redux/utils/utils.actions';

// Import Styles
import "../../styles/modal.scss";

// Import data
import modalLangData from '../../data/modal.json';

const Modal = ({ onClose, content, movieCredits, mediaType, isInMyList }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const p = useSelector((state: RootState) => state.profile.profile);
  const season = useSelector((state: RootState) => state.series.season);
  const similarMovies = useSelector((state: RootState) => state.movies.moreLikeThisMovie);
  const similarTv = useSelector((state: RootState) => state.series.moreLikeThisTv);
  const [visibleEpisodes, setVisibleEpisodes] = useState<number>(10);
  const [inMyList, setInMyList] = useState<boolean>(isInMyList);
  const [seasonNumber, setSeasonNumber] = useState<string>(mediaType === "tv" ? "1" : "")
  const appLang = useSelector((state: RootState) => state.utils.language);
  const language = p ? p.profile.language : appLang;
  const [similar, setSimilar] = useState<any>([]);
  const [creator, setCreator] = useState<any>([]);
  const [langData, setLangData] = useState(modalLangData[language])
  const getSeason = useQuery(GET_SEASON, {
    variables: {
      tvId: content ? content.id : null,
      seasonNumber: seasonNumber,
      language: p.profile.language
    },
    skip: mediaType === "movie" || !content
  });

  const getSimilarMovie = useQuery(GET_SIMILAR_MOVIE, {
    variables: {
      whatToTarget: "similar",
      getUpcomTopRatedPopuNowPlayingId: content ? content.id : null,
      language: p.profile.language,
      page: "1"
      },
      skip: mediaType === "tv"
  });

  const getSimilarTv = useQuery(GET_SIMILAR_TV, {
    variables: {
      whatToTarget: "similar",
      getUpcomTopRatedPopuNowPlayingTvId: content ? content.id : null,
      language: p.profile.language,
      page: "1"
      },
      skip: mediaType === "movie"
  });

  const generateRandomAverage = () => {
    return Math.floor(Math.random() * 21) + 79;
  };

  const handleIsInMyList = (value: boolean) => {
    setInMyList(value);
  }

  const handleResetState = () => {
    setSeasonNumber("1");
    setVisibleEpisodes(10);
  }

  const [averageNum] = useState<number>(generateRandomAverage());

  const handleCloseModal = (e: MouseEvent) => {
    if (
      modalRef.current &&
      e.target instanceof Node &&
      !modalRef.current.contains(e.target)
    ) {
      dispatch(reset_movie_store());
      dispatch(reset_tv_store());
      dispatch(resetMediaType());
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, inMyList]);

  const renderCredits = (mediaType) => {
    if(movieCredits?.cast?.length > 0 || content.credits?.cast?.length > 0){
      const credits = mediaType === "movie" ? movieCredits?.cast : content.credits?.cast;
      const creditsToRender = credits.slice(0, 3); // récupère les 3 premiers éléments

      return (
        <Fragment>
          {creditsToRender.map((credit, index) => (
            <span key={index}> {credit.name}{index < creditsToRender.length - 1 && ","}</span>
          ))}
        </Fragment>
      );
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonNumber = e.target.value;
    setSeasonNumber(selectedSeasonNumber);
    setVisibleEpisodes(10);
  }

  const handleShowMore = (e) => {
    e.stopPropagation();
    const episodeLeftToShow = content?.number_of_episodes - visibleEpisodes;
    if(episodeLeftToShow > 10) {
      setVisibleEpisodes(visibleEpisodes + 10);
    }
    else {
      setVisibleEpisodes(visibleEpisodes + episodeLeftToShow);
    }
  }

  useEffect(() => {
    if(getSeason.data?.getSeason) {
      dispatch(get_season(getSeason.data))
    }

  }, [getSeason.data, getSeason.data?.getSeason, seasonNumber, dispatch, season, similar])

  useEffect(() => {
    if(getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying) {
      dispatch(get_similar_movies(getSimilarMovie.data))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSimilarMovie.data, getSimilarMovie.data?.getUpcomTopRatedPopuNowPlaying, dispatch])

  useEffect(() => {
    if(getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV) {
      dispatch(get_similar_tv(getSimilarTv.data));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSimilarTv.data, getSimilarTv.data?.getUpcomTopRatedPopuNowPlayingTV, dispatch])

  useEffect(() => {
    if(mediaType === "movie" && similarMovies !== null) {
      const filteredData = similarMovies.results.filter((item) => item.poster_path || item.backdrop_path)
      setSimilar(filteredData)
    } else if (mediaType === "tv" && similarTv !== null) {
      const filteredData = similarTv.results.filter((item) => item.poster_path || item.backdrop_path)
      setSimilar(filteredData)
    }
  }, [content, mediaType, similarMovies, similarTv])

  useEffect(() => {
    if(mediaType === "movie") {
      const directorNames = movieCredits ? movieCredits.crew.filter((item) => item.job === "Director").map((item) => item.name) : [];
      setCreator(directorNames);
    } else if (mediaType === "tv") {
      if(content !== null) {
        content.created_by.length > 0 && setCreator(content.created_by.map((item) => item.name));
      }
    } else {
      // console.log("An Error Occured when retrieve the creator")
    }
  }, [content, mediaType, movieCredits])

  if (content) {
    let filteredList;
    let sortByYear;

    const currentYear = new Date().getFullYear(); // récupère l'année en cours

    if(mediaType === "movie") {
      if(content.belongs_to_collection !== null) {
        filteredList = content.belongs_to_collection.parts.filter((item) => {
          const year = new Date(item.release_date).getFullYear();
          return year <= currentYear;
        });

        sortByYear = filteredList.sort((a, b) => {
          const yearA = new Date(a.release_date).getFullYear();
          const yearB = new Date(b.release_date).getFullYear();
          return yearA - yearB;
        });
      }
    }

    return (
      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="img-container">
              <img src={`https://image.tmdb.org/t/p/original/${content.backdrop_path ? content.backdrop_path : content.poster_path}`} alt={mediaType === "movie" ? content.title : content.name} />
              <div className="gradient"></div>
            </div>
            <div className="header-content">
              <Typography HTMLElement="h1" classname="modal-title">{mediaType === "movie" ? content.title : content.name}</Typography>
              <div className="btn-container">
                <button className="btn btn-play" title={langData.headerContent.btnPlayTitle}><Arrow classname="icon" />{langData.headerContent.btnPlay}</button>
                {inMyList ? (<button className="btn btn-check"><Check classname="icon" /></button>) : (<button className="btn btn-add"><Add classname="icon" /></button>)}
                <button className="btn btn-like"><Like classname="icon" /></button>
              </div>
            </div>
          </div>
          <div className="modal-info">
            <div className="left-info">
              <div className="info-content-details">
                <Typography HTMLElement="p" classname="info-content-details-item vote-average">{langData.modalInfo.voteAverage} {averageNum} %</Typography>
                <Typography HTMLElement="p" classname="info-content-details-item release-date">{content.release_date ? getYearFromDate(content.release_date) : getYearFromDate(content.first_air_date)}</Typography>
                {content.runtime ? (<Typography HTMLElement="p" classname="info-content-details-item runtime">{convertMinutesToHours(content.runtime)}</Typography>) : null}
                {content.number_of_seasons ?
                  content.number_of_seasons > 1 ?
                    (<Typography HTMLElement="p" classname="info-content-details-item seasons">{content.number_of_seasons} {langData.modalInfo.seasonOrEpisodes[0]}{content.number_of_seasons > 1 ? "s" : null}</Typography>)
                      : (<Typography HTMLElement="p" classname="info-content-details-item seasons">{content.number_of_episodes} {langData.modalInfo.seasonOrEpisodes[1]}{content.number_of_episodes > 1 ? "s" : null}</Typography>)
                      : null}
                <HD classname="icon" />
              </div>
              <div className="info-content-maturity-rating">
                {p.profile.kid ? (
                  <MRAllPublic classname="icon" />
                ) : (
                  <Fragment>
                    <MRTwelvePlus classname="icon" />
                    <MRFear classname="icon"  />
                    <MRViolence classname="icon" />
                    <MRProfanity classname="icon" />
                  </Fragment>
                  )}
              </div>
              <div className="info-content-overview">
                <Typography HTMLElement="p" classname="info-content-overview-text">{content.overview}</Typography>
              </div>
            </div>
            <div className="right-info">
              <div className="distribution">
                <Typography HTMLElement="p" classname="distribution-title">
                  <span className="title">{langData.modalInfo.cast} :</span>
                  {renderCredits(mediaType)}
                </Typography>
              </div>
              <div className="genres">
                <Typography HTMLElement="p" classname="genres-title">
                  <span className="title">{langData.modalInfo.genres} :</span>
                  <Fragment>
                    {content.genres.length > 0 ? content.genres.map((genre, index) => (
                      <span key={index}> {genre.name}{index < content.genres.length - 1 && ","}</span>
                    )) : null}
                  </Fragment>
                </Typography>
              </div>
            </div>
          </div>
          {mediaType === "movie" ? content.belongs_to_collection ? (
            <div className="modal-collection">
              <Typography HTMLElement="h2" classname="modal-collection-title">
                <Collection classname="icon" />
                <span className="title">{content.belongs_to_collection.name}</span>
              </Typography>
              <div className="short-card-container">
                {sortByYear.map((part, index) => (<ShortCard data={part} mediaType={mediaType} key={index} inMyList={handleIsInMyList} handleResetState={handleResetState} />))}
              </div>
            </div>) : null : null
          }
          {mediaType === "tv" ? (
            <div className="modal-episodes">
              <div className="modal-episodes-header">
                <div className="modal-episodes-header-left">
                  <Typography HTMLElement="h2" classname="modal-episodes-title">
                    {langData.modalEpisodes.episodeTitle}
                  </Typography>
                  <Typography HTMLElement="p" classname="modal-episodes-season">
                  {langData.modalEpisodes.seasonTitle} {seasonNumber}:
                  </Typography>
                </div>
                {content.seasons !== null ? content.seasons.length > 1 ? (
                <div className="modal-episodes-header-right">
                  <select value={seasonNumber} onChange={handleChange}>
                    {content.seasons.map((season, index) => (
                      <option key={index} value={season.season_number}>{season.name}</option>
                    ))}
                  </select>
                </div>
                ) : null : null}
                {content.seasons === null ? content.number_of_seasons > 1 ? (
                <div className="modal-episodes-header-right">
                  <select value={seasonNumber} onChange={handleChange}>
                    {Array.from({ length: content.number_of_seasons }, (_, index) => (
                      <option key={index} value={index + 1}>{langData.modalEpisodes.seasonTitle} {index + 1}</option>
                    ))}
                  </select>
                </div>
                ) : null : null}
              </div>
              <div className="modal-episodes-list" title={langData.modalEpisodeList.title}>
                  {season !== null ? season.episodes.slice(0, visibleEpisodes).map((episode) => (
                    <div className="episode-container" key={episode.id}>
                      <div className="episode-number">
                        <Typography HTMLElement="p" classname="episode-number-text">{episode.episode_number}</Typography>
                      </div>
                      <div className="episode-image">
                        <img src={episode.still_path ? `https://image.tmdb.org/t/p/w500${episode.still_path}` : "https://via.placeholder.com/500x281"} alt={episode.name} />
                        <PlayCircle classname="icon" />
                      </div>
                      <div className="episode-info">
                        <Typography HTMLElement="h3" classname="episode-title">{episode.name}</Typography>
                        <Typography HTMLElement="p" classname="episode-overview">{episode.overview}</Typography>
                      </div>
                    </div>
                  )) : null}
                    {season !== null ? visibleEpisodes < season.episodes.length && (
                    <button className="show-more" onClick={handleShowMore} title={langData.modalEpisodeList.btnShowMoreTitle}>
                      <DownArrow classname="icon" />
                    </button>
                  ) : null}
              </div>
          </div>
          ) : null}
          {similar !== undefined ? (<div className="modal-more-like-this">
              <Typography HTMLElement="h2" classname="modal-more-like-this-title">
                {langData.similar.title}
              </Typography>
              <div className="short-card-container">
                {similar && similar.length >  0 ? similar.map((item, index) => (<ShortCard data={item} mediaType={mediaType} key={index} inMyList={handleIsInMyList} handleResetState={handleResetState} />)) : null}
              </div>
            </div>
          ) : null}
          <div className="modal-about">
            <Typography HTMLElement="h2" classname="modal-about-title">
              {langData.about.title} {mediaType === "movie" ? content.title : content.name}
            </Typography>
            {creator.length > 0 ? (<div className="modal-about-row">
              <Typography HTMLElement="p" classname="modal-about-text">{langData.about.creator}:</Typography>
              <ul>
                {creator.map((item, index) => (
                  <li key={index}> {item}{index < creator.length - 1 && ","}</li>
                ))}
              </ul>
            </div>) : null}
            <div className="modal-about-row">
              <Typography HTMLElement="p" classname="modal-about-text">{langData.about.cast}:</Typography>
              <ul>
                {mediaType === "movie" ? movieCredits !== null ? movieCredits.cast.slice(0,10).map((item, index) => (
                  <li key={index}> {item.name}{index < 9 && ","}</li>
                )) : null : content.credits.cast.slice(0,10).map((item, index) => (
                  <li key={index}> {item.name}{index < 9 && ","}</li>
                ))}
              </ul>
            </div>
            <div className="modal-about-row">
              <Typography HTMLElement="p" classname="modal-about-text">{langData.about.genres}:</Typography>
              <ul>
                {content.genres.map((item, index) => (
                  <li key={index}> {item.name}{index < content.genres.length - 1 && ","}</li>
                ))}
              </ul>
            </div>
            <div className="modal-about-row">
              <Typography HTMLElement="p" classname="modal-about-text">{langData.about.maturityRating}:</Typography>
              {p.profile.kid ? (
                  <MRAllPublic classname="icon" />
                ) : (
                  <div className="MR-container">
                    <MRTwelvePlus classname="icon" />
                    <MRFear classname="icon"  />
                    <MRViolence classname="icon" />
                    <MRProfanity classname="icon" />
                  </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content modal-skeleton">
        <SkeletonLoading />
      </div>
    </div>
  );
};

export default Modal;