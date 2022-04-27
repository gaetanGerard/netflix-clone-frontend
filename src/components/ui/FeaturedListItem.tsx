import React, { useState, useEffect } from 'react';

// Import Custom Components
import Typography from './Typography';

type ListItem = {
    backdrop_path: string
    genre_ids: [number]
    id: string
    media_type: string
    overview: string
    poster_path: string
    title: string
    vote_average: number
    name: string
}

type Props = {
    myList: [ListItem]
}

const FeaturedListItem = ({myList}: Props) => {
    const [randomItem, setRandomItem] = useState<ListItem|null>(null)
    const item = myList[Math.floor(Math.random()*myList.length)];

    useEffect(() => {
        setRandomItem(item)
    }, [item])

    // console.log(randomItem);

    if(randomItem) {
        return (
            <div className="featured-list-item-container" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomItem.backdrop_path})`}}>
                <div className="featured-list-item-info">
                    <Typography HTMLElement="h1" classname="featured-list-item-title">{randomItem.media_type === "movie" ? randomItem.title : randomItem.name}</Typography>
                    <Typography HTMLElement="p" classname="featured-list-item-overview">{randomItem.overview}</Typography>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}


export default FeaturedListItem