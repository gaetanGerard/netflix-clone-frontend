import React, { useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';

// Import Custom Components
import SkeletonLoading from "./SkeletonLoading";
import Typography from "./Typography";

// Import Icons
import Add from "../ui/icons/Add";
import Arrow from "../ui/icons/Arrow";
import Check from "../ui/icons/Check";
import Like from "../ui/icons/Like";

// Import Redux
import { reset_movie_store } from '../../redux/movies/movies.actions';
import { reset_tv_store } from '../../redux/series/series.actions';

// Import Styles
import "../../styles/modal.scss";

const Modal = ({ onClose, content, movieCredits, mediaType, isInMyList }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

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
  }, [content]);

  // console.log(content)
  // console.log(movieCredits)
  // console.log(mediaType)

  if(content) {
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
                <button className="btn btn-play"><Arrow classname="icon" />Play</button>
                {isInMyList ? (<button className="btn btn-check"><Check classname="icon" /></button>) : (<button className="btn btn-add"><Add classname="icon" /></button>)}
                <button className="btn btn-like"><Like classname="icon" /></button>
              </div>
            </div>
            {/*
              Modal Header should contain an images as background
              the title
              a list of button one for play, one for add to my list, one for like
            */}
          </div>
          <div className="modal-info">
            {/*
              This section should contains 2 columns
              left column:
                - a list of basic info (release date, runtime, HD logo, Subtitles icon, ...)
                - a list of icons representing some rating and content infos (violence, noisy, ...)
                a short overview of the movie or serie
              right column:
                - a list of cast members
                - a list of genres
            */}
          </div>
          {/*
            if(mediaType === "movie") return modal-collection else return modal-episodes
          */}
          <div className="modal-collection">
            {/*
              This section should be render conditionally as it first depend if its a movie or serie but also if the movie
              is part of a collection
              - it should have a title with a book shelf icon
              - its should have some basic "card like" component displaying the movie (that should be link that if clicked upadte
                the modal with the new content)
                - the card should have a poster image with a title on it
                - a release date
                - a short overview
                - for this list the card should not have the button add to my-list displayed
                (As the style for this card is reuse in other list after i should create a Component for that)
            */}
          </div>
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