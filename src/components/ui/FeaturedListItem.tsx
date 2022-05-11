import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

// Import Custom Components
import Typography from './Typography';
import Button from './Button';
import Arrow from './icons/Arrow';
import EpisodeList from './icons/EpisodeList';
import Information from './icons/Information';
import MaturityRating from './icons/MaturityRating';

// Import Types
import { ListItem } from '../../types/featuredType';

type Props = {
    myList: [ListItem]
}

const FeaturedListItem = ({myList}: Props) => {
    const location = useLocation();
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
    }, [item])

    const onclick = (e) => {
        console.log(e.target.name)
    }


    if(randomItem) {
        return (
            <div className="featured-list-item-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomItem.backdrop_path})`}}>
                <div className="featured-list-item-info">
                    <Typography HTMLElement="h1" classname="featured-list-item-title">{randomItem.title ? randomItem.title : randomItem.name}</Typography>
                    <Typography HTMLElement="p" classname="featured-list-item-overview">{randomItem.overview}</Typography>
                    <div className="featured-list-item-btn-container">
                        <Link to="TO_DEFINE" className="btn btn-play"><Arrow />{randomItem.name ? "Play Episode" : "Play"}</Link>
                        <Button btnType="button" classname="btn btn-dialog" onclick={(e) => onclick(e)} name="openInfo" >{randomItem.name? <EpisodeList /> : <Information />}{randomItem.name ? "Episodes" : "More Info"}</Button>
                    </div>
                </div>
                <div className="featured-list-item-maturity-rating">
                    <MaturityRating classname="maturity-rating-icon" />
                </div>
                <div className="gradient"></div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}


export default FeaturedListItem