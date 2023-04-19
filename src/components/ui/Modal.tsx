import React, { useRef, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';


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

// Import Utils
import { convertMinutesToHours, getYearFromDate } from '../../utils/function';

// Import Redux
import { RootState } from "../../redux/root-reducer";
import { reset_movie_store } from '../../redux/movies/movies.actions';
import { reset_tv_store } from '../../redux/series/series.actions';

// Import Styles
import "../../styles/modal.scss";

const Modal = ({ onClose, content, movieCredits, mediaType, isInMyList }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const p = useSelector((state: RootState) => state.profile.profile);
  const [inMyList, setInMyList] = useState<boolean>(isInMyList);

  const generateRandomAverage = () => {
    return Math.floor(Math.random() * 21) + 79;
  };

  const handleIsInMyList = (value: boolean) => {
    setInMyList(value);
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
      onClose();
    }
  };

  useEffect(() => {
    // console.log(content)
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, inMyList]);

  const renderCredits = (mediaType) => {
    // console.log(movieCredits)
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

  // console.log(content)
  // console.log(movieCredits)
  // console.log(mediaType)

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
              <img src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} alt={mediaType === "movie" ? content.title : content.name} />
              <div className="gradient"></div>
            </div>
            <div className="header-content">
              <Typography HTMLElement="h1" classname="modal-title">{mediaType === "movie" ? content.title : content.name}</Typography>
              <div className="btn-container">
                <button className="btn btn-play" title="This button do nothing"><Arrow classname="icon" />Play</button>
                {inMyList ? (<button className="btn btn-check"><Check classname="icon" /></button>) : (<button className="btn btn-add"><Add classname="icon" /></button>)}
                <button className="btn btn-like"><Like classname="icon" /></button>
              </div>
            </div>
          </div>
          <div className="modal-info">
            <div className="left-info">
              <div className="info-content-details">
                <Typography HTMLElement="p" classname="info-content-details-item vote-average">Recommandé à {averageNum} %</Typography>
                <Typography HTMLElement="p" classname="info-content-details-item release-date">{content.release_date ? getYearFromDate(content.release_date) : getYearFromDate(content.first_air_date)}</Typography>
                {content.runtime ? (<Typography HTMLElement="p" classname="info-content-details-item runtime">{convertMinutesToHours(content.runtime)}</Typography>) : null}
                {content.number_of_seasons ?
                  content.number_of_seasons > 1 ?
                    (<Typography HTMLElement="p" classname="info-content-details-item seasons">{content.number_of_seasons} Season{content.number_of_seasons > 1 ? "s" : null}</Typography>)
                      : (<Typography HTMLElement="p" classname="info-content-details-item seasons">{content.number_of_episodes} Episode{content.number_of_episodes > 1 ? "s" : null}</Typography>)
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
                  <span className="title">Distribution :</span>
                  {renderCredits(mediaType)}
                </Typography>
              </div>
              <div className="genres">
                <Typography HTMLElement="p" classname="genres-title">
                  <span className="title">Genres :</span>
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
                {sortByYear.map((part, index) => (<ShortCard data={part} mediaType={mediaType} key={index} inMyList={handleIsInMyList} />))}
              </div>
            </div>) : null : null
          }
          {mediaType === "tv" ? (
            <div className="modal-episodes">
            {/*
              This should be a list of all the episodes for one season (the list should be limited to 10 items but should also
                extensible to display all the episodes for a season)
              if its have only one season i should only display the list of episodes for the season overwise i should also
              display a dropdown to select the season (default to the first season)
              an item for an episode should have 3 columns:
                - a column with the episode number
                - a column with the image of the episode
                - a column with the title, a short overview and the time length of the episode

              every episode should be a link for go the episode page and start it as for my demo its irrelevant i will
              only change the mouse cursor to a pointer and maybe display a message to remind that this is not a real
              website
            */}
          </div>
          ) : null}
          <div className="modal-more-like-this">
            {/*
              This should be a list of card base on the genre of the movie or serie (the list should be limited to 10 items)
              every card should have a button to add on my-list
            */}
          </div>
          <div className="modal-about">
            {/*
              This section should render information available like cast, director, genres, maturity rating, ...
            */}
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