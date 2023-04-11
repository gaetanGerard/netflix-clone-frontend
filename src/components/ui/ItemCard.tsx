import React, {useEffect, useState} from 'react'

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
}

type Props = {
    item: CardItem
    itemID: number
    listLength: number
}

const ItemCard = ({item, itemID, listLength}: Props) => {
    const [lastInRow, setLastInRow] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth - 100);
    const [itemsPerRow, setItemsPerRow] = useState(Math.floor(windowSize / 235));
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

  return (
    <div className={`card ${lastInRow ? "last-card-in-row" : ""}`}>
        <div className="card-inner">
            <div className="img-container">
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path !== null ? item.poster_path : item.backdrop_path}`} alt={item.title ? item.title: item.name} />
                <p>{item.title ? item.title : item.name}</p>
                <div className="gradient"></div>
            </div>
            <div className="card-body">
                <div className="btn-container">

                </div>
                <div className="detail-container">

                </div>
                <div className="genre-container">

                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemCard