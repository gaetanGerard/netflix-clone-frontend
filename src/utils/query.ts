import { gql  } from '@apollo/client';

export const LOGIN_USER = gql`
    query Query($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            _id
            token
            email
            password
            firstname
            lastname
            date_of_birth
            gender
            profile_pic
            description
            created_at
            updated_at
            rememberMe
            specialOffers
            subscriptionPlan
            profiles {
              p_name
              kid
              language
              profile_pic
              autoplay_next_episode
              autoplay_preview
              my_list {
                id
                title
                name
                media_type
                poster_path
                backdrop_path
                overview
                genre_ids
                vote_average
                runtime
                number_of_seasons
                number_of_episodes
              }
            }
        }
    }
`;

export const GET_USER = gql`
  query Query {
    getUser {
      _id
      email
      date_of_birth
      description
      firstname
      gender
      lastname
      profile_pic
      updated_at
      created_at
      rememberMe
      specialOffers
      subscriptionPlan
      profiles {
        p_name
        kid
        language
        profile_pic
        autoplay_next_episode
        autoplay_preview
        my_list {
          id
          title
          name
          media_type
          poster_path
          backdrop_path
          overview
          genre_ids
          vote_average
          runtime
          number_of_seasons
          number_of_episodes
        }
      }
    }
  }
`;

export const DISCOVERS = gql `
  query GetDiscover($media: String, $language: String, $kid: Boolean, $sortBy: String, $page: Int, $originalLanguage: String, $withGenre: String) {
    getDiscover(media: $media, language: $language, kid: $kid, sortBy: $sortBy, page: $page, originalLanguage: $originalLanguage, withGenre: $withGenre) {
      page
      results {
        __typename
        ... on MoviesDiscover {
          id
          backdrop_path
          genre_ids
          overview
          poster_path
          release_date
          title
        }
        ... on TVDiscover {
          id
          poster_path
          backdrop_path
          overview
          first_air_date
          genre_ids
          name
        }
      }
      total_pages
      total_results
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($getMovieId: ID, $language: String) {
    getMovie(id: $getMovieId, language: $language) {
      title
      id
      runtime
      release_date
      overview
      genres {
        name
        id
      }
      belongs_to_collection {
        name
        parts {
          title
          release_date
          backdrop_path
          poster_path
          overview
          media_type
          id
          vote_average
        }
      }
      poster_path
      backdrop_path
      }
    }
`;

export const GET_MOVIE_CREDIT = gql`
  query GetCredits($getCreditsId: ID!, $language: String) {
    getCredits(id: $getCreditsId, language: $language) {
      cast {
        name
        id
        character
      }
      crew {
        department
        job
        id
        name
      }
    }
  }
`;

export const GET_TV = gql`
  query GetSerie($getSerieId: ID, $language: String, $appendToResponse: String) {
    getSerie(id: $getSerieId, language: $language, appendToResponse: $appendToResponse) {
      name
      first_air_date
      backdrop_path
      poster_path
      overview
      genres {
        name
        id
      }
      created_by {
        name
      }
      number_of_seasons
      number_of_episodes
      seasons {
        episode_count
        id
        poster_path
        season_number
        air_date
        name
        overview
      }
      vote_average
      id
      episode_run_time
      credits {
        cast {
          name
          id
          character
        }
      }
    }
  }
`;

export const GET_SEASON = gql`
  query GetSeason($tvId: ID!, $seasonNumber: String!, $language: String) {
  getSeason(tvId: $tvId, seasonNumber: $seasonNumber, language: $language) {
    air_date
    name
    overview
    poster_path
    season_number
    episodes {
      air_date
      episode_number
      id
      name
      overview
      still_path
    }
    id
  }
}
`;

export const GET_SIMILAR_MOVIE = gql`
  query GetUpcomTopRatedPopuNowPlaying($whatToTarget: String, $getUpcomTopRatedPopuNowPlayingId: ID, $language: String, $page: String) {
    getUpcomTopRatedPopuNowPlaying(whatToTarget: $whatToTarget, id: $getUpcomTopRatedPopuNowPlayingId, language: $language, page: $page) {
      ... on Discover {
        __typename
        results {
          __typename
          ... on MoviesDiscover {
            id
            backdrop_path
            overview
            poster_path
            release_date
            title
            genre_ids
          }
        }
        page
        total_pages
        total_results
      }
    }
  }
`;

export const GET_SIMILAR_TV = gql`
  query GetUpcomTopRatedPopuNowPlayingTV($whatToTarget: String, $getUpcomTopRatedPopuNowPlayingTvId: ID, $language: String, $page: String) {
    getUpcomTopRatedPopuNowPlayingTV(whatToTarget: $whatToTarget, id: $getUpcomTopRatedPopuNowPlayingTvId, language: $language, page: $page) {
      page
      results {
        backdrop_path
        first_air_date
        id
        name
        overview
        poster_path
        genre_ids
      }
      total_pages
      total_results
    }
  }
`;

export const TRENDING_MOVIE = gql `
  query GetTrending($mediaType: String!, $timeWindow: String!, $language: String, $page: String) {
    getTrending(mediaType: $mediaType, timeWindow: $timeWindow, language: $language, page: $page) {
      page
      total_pages
      total_results
      results {
        __typename
        ... on MoviesDiscover {
          backdrop_path
          genre_ids
          id
          media_type
          poster_path
          release_date
          title
        }
      }
    }
  }
`;

export const TRENDING_TV = gql `
  query GetTrending($mediaType: String!, $timeWindow: String!, $language: String, $page: String) {
  getTrending(mediaType: $mediaType, timeWindow: $timeWindow, language: $language, page: $page) {
    page
    total_pages
    total_results
    results {
      __typename
      ... on TVDiscover {
        backdrop_path
        first_air_date
        genre_ids
        id
        name
        overview
        poster_path
      }
    }
  }
}
`;

export const UPCOMING_MOVIES = gql`
  query GetUpcomTopRatedPopuNowPlaying($whatToTarget: String, $language: String, $page: String) {
    getUpcomTopRatedPopuNowPlaying(whatToTarget: $whatToTarget, language: $language, page: $page) {
      ... on ResultWithDate {
        __typename
        page
        results {
          __typename
          ... on MoviesDiscover {
            backdrop_path
            genre_ids
            id
            poster_path
            overview
            title
            release_date
          }
        }
        dates {
          maximum
          minimum
        }
        total_pages
        total_results
      }
    }
  }
`;

export const TOP_RATED_TV = gql`
  query GetUpcomTopRatedPopuNowPlayingTV($whatToTarget: String, $language: String, $page: String) {
    getUpcomTopRatedPopuNowPlayingTV(whatToTarget: $whatToTarget, language: $language, page: $page) {
      page
      total_pages
      total_results
      results {
        backdrop_path
        first_air_date
        genre_ids
        id
        name
        overview
        poster_path
      }
    }
  }
`;

export const TOP_RATED_MOVIES = gql`
  query GetUpcomTopRatedPopuNowPlaying($whatToTarget: String, $language: String, $page: String) {
    getUpcomTopRatedPopuNowPlaying(whatToTarget: $whatToTarget, language: $language, page: $page) {
      ... on Discover {
        __typename
        page
        total_pages
        total_results
        results {
          __typename
          ... on MoviesDiscover {
            backdrop_path
            genre_ids
            id
            overview
            poster_path
            release_date
            title
          }
        }
      }
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres($media: String, $language: String) {
    getGenres(media: $media, language: $language) {
      genres {
        id
        name
      }
    }
  }
`;