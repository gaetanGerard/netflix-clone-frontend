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
  query Query($media: String, $language: String, $sortBy: String, $primaryReleaseDateGte: String, $page: Int) {
    getDiscover(media: $media, language: $language, sortBy: $sortBy, primaryReleaseDateGTE: $primaryReleaseDateGte, page: $page) {
      page
      results {
        ... on MoviesDiscover {
          id
          adult
          genre_ids
          backdrop_path
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