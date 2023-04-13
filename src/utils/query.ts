import { gql } from '@apollo/client';

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
  query GetDiscover($media: String, $language: String) {
    getDiscover(media: $media, language: $language) {
      page
      results {
        __typename
        ... on MoviesDiscover {
          id
          adult
          backdrop_path
          genre_ids
          original_language
          original_title
          overview
          popularity
          poster_path
          release_date
          title
          video
          vote_average
          vote_count
          media_type
        }
        ... on TVDiscover {
          id
          poster_path
          popularity
          backdrop_path
          vote_average
          overview
          first_air_date
          origin_country
          genre_ids
          original_language
          vote_count
          name
          original_name
          media_type
        }
      }
      total_pages
      total_results
    }
  }
`;

export const GET_MOVIE = gql`
query GetMovie($getMovieId: ID) {
  getMovie(id: $getMovieId) {
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
  query GetMovie($getCreditsId: ID!, $language: String) {
    getCredits(id: $getCreditsId, language: $language) {
      cast {
        name
        id
        character
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