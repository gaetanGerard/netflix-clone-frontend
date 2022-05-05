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
    id
    adult
    backdrop_path
    belongs_to_collection {
      id
      name
      poster_path
      backdrop_path
      overview
      parts {
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
    }
    budget
    genres {
      id
      name
    }
    homepage
    imdb_id
    original_language
    original_title
    overview
    popularity
    poster_path
    production_companies {
      name
      id
      logo_path
      origin_country
    }
    production_countries {
      iso_3166_1
      name
    }
    release_date
    revenue
    runtime
    spoken_languages {
      english_name
      iso_639_1
      name
    }
      status
      tagline
      title
      video
      vote_average
      vote_count
    }
  }
`;