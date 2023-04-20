export type TV = {
    id: string,
    poster_path?: string,
    popularity?: number,
    backdrop_path?: string,
    vote_average: number,
    overview: string,
    first_air_date?: string,
    origin_country: string[],
    genre_ids: number[],
    original_language: string,
    vote_count: number,
    name: string,
    original_name: string,
    media_type?: string
}

type Genre = {
    id: string
    name: string
}

type CreatedBy = {
    name: string
}

type Season = {
    episode_count: number
    id: string
    poster_path: string
    season_number: number
    air_date: string
    name: string
    overview: string
}

type Credits = {
    cast: Cast[]
}

type Cast = {
    name: string
    id: string
    character: string
}

type Episode = {
    id: string
    episode_number: number
    air_date: string
    name: string
    overview: string
    still_path: string
}

export type SERIES = {
    name: string
    first_air_date: string
    backdrop_path: string
    poster_path: string
    overview: string
    genres: Genre[]
    created_by: CreatedBy[]
    number_of_seasons: number
    number_of_episodes: number
    seasons: Season[]
    vote_average: number
    id: string
    episode_run_time: number
    credits: Credits
}

export type SEASON = {
    id: string
    name: string
    overview: string
    poster_path: string
    season_number: number
    episodes: Episode[]
    air_date: string
}