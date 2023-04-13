import React, {useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

// Import Redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import Modal from "../ui/Modal";

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
    const movieGenres = useSelector((state: RootState) => state.utils.movieGenres);
    const tvGenres = useSelector((state: RootState) => state.utils.tvGenres);
    const [lastInRow, setLastInRow] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth - 100);
    const [itemsPerRow, setItemsPerRow] = useState(Math.floor(windowSize / 235));
    const [showModal, setShowModal] = useState(false);
    const itemSize = 235;

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


    const convertMinutesToHours = (minutes: number | undefined) => {
        if(minutes === undefined) return null;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    const getGenreName = (genreID: string) => {
        const genre = movieGenres.find(genre => genre.id === genreID);
        if(genre === undefined) {
            const genre = tvGenres.find(genre => genre.id === genreID);
            if(genre === undefined) return null;
            return genre.name;
        }
        return genre.name;
    }

    const handleClick = () => {
        setShowModal(true);
    };

  return (
    <Fragment>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
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
                        <div className="right-icon-container" onClick={handleClick}>
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