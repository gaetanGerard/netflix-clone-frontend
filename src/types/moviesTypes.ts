export type MOVIES = {
    id: string,
    adult?: boolean,
    backdrop_path?: string,
    genre_ids?: number[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity?: number,
    poster_path?: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    media_type?: string
}

type Genres = {
    name: string,
    id: string
}

type BelongToCollection = {
    name: string,
    parts: CollectionPart[]
}

type CollectionPart = {
    title: string,
    release_date: string,
    backdrop_path: string,
    poster_path: string,
    overview: string,
    media_type: string,
    id: string,
    vote_average: number,
}


export type MOVIE = {
    title: string,
    id: string,
    runtime: number,
    release_date: string,
    overview: string,
    genres: Genres[]
    belongs_to_collection: BelongToCollection
    poster_path: string,
    backdrop_path: string,
}

type Cast = {
    name: string,
    id: string,
    character: string,
}

export type MOVIE_CREDIT = {
    cast: Cast[],
}