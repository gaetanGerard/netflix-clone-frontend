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
      }
    }
  }
`;