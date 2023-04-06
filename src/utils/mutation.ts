import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
    mutation Mutation($email: String!, $password: String!, $specialOffers: Boolean!, $subscriptionPlan: String!) {
        registerUser(email: $email, password: $password, specialOffers: $specialOffers, subscriptionPlan: $subscriptionPlan) {
            token
        }
    }
`;

export const ADD_NEW_PROFILE = gql`
    mutation Mutation($profileList: ProfileInput!) {
        updateUserProfileList(profileList: $profileList) {
            autoplay_next_episode
            autoplay_preview
            kid
            language
            p_name
            profile_pic
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
`;