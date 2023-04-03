import React from 'react'

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
}

const ItemCard = ({item}: Props) => {
    console.log(item)
  return (
    <div className="card">
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
  )
}

export default ItemCard